import React, { useEffect, useLayoutEffect, useState } from "react";

const Table = ({ }) => {
    const [tableRows, setTableRows] = useState([]);
    const [skip, setSkip] = useState(0);
    const [top, setTop] = useState(10);
    const [total, setTotal] = useState(0);

    useEffect(() => {

        // Array of promises
        var aPromises = [promiseFunction1(), promiseFunction2()];

        Promise.all([aPromises]).then((res) => {}).catch((err) => {}) // This itself returns a promise and the function goes to the then block only if all the promises are fulfilled even if one is failed it will go the catch block
        Promise.race([aPromises]).then((res) => {}).catch((err) => {}) // This itself returns a promise and only returns the first promise that gets fulfilled or rejected
        Promise.any([aPromises]).then((res) => {}).catch((err) => {}) // This itself returns a promise and only returns the first promise that gets fulfilled and not the rejected one.
        // The main difference between Promise.all and Promise.allSettled is that Promise.all gets fulfilled only when all the Promises are resolved from the array whereas in 
        // Promise.allSettled even if any one of them is rejected still it will fulfill the allSettled Promise

        // Promise.allSettled(aPromises) // This itself returns a promise and it is fulfilled even if any promise has failed. It doesn't matter for all the promises in the array to fulfill.
        //     .then(function (values) { // Testing out Promises
        //         console.log(values)
        //         if (values && values.length !== 0) {
        //             var flag = values.some((item) => item.status === "rejected")
        //         }
        //         if (!flag) {
        //             fetchData(top, skip);
        //         }
        //     })
        //     .catch((error) => {console.log(error)}) // This can also be added with then

        // This is the modern approach, using promises with async await
        result();
        // Promise chaining
        // promiseFunction1().then((res) => {
        //     console.log(res);
        //     return promiseFunction2();
        // }).then((res) => {
        //     console.log(res);
        //     return fetchData(top, skip);
        // }).catch((err) => {
        //     console.error(err)
        // })
    }, []);

    const result = async () => {
        try {
            var func1 = await promiseFunction1();
            var func2 = await promiseFunction2();
            var fetchedData = await fetchData(top, skip);
            console.log(func1, func2, fetchedData);
        } catch (error) {
            console.log(error)
        }
        
    }

    const fetchData = async (limit, skip) => {
        try {
            const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
            const tableData = await response.json();
            setTableRows(tableData.products);
            setTotal(tableData.total);
            return tableData
            // console.log(tableData);
        } catch (error) {
            setTableRows([]);
            console.error("Error fetching table data:", error);
        }
    };


    // 1st way of doing this
    // const promiseFunction1 = () => { // Correct function 
    //     return new Promise(async (resolve, reject) => {
    //         try{
    //             var response = await fetch(`https://dummyjson.com/products`)
    //             var data = await response.json();
    //             resolve("true")
    //         }catch(error){
    //             console.error("Some Error occured:" + error);
    //             reject(new Error("Some error occured"))
    //         }
    //     })
    // }

    // const promiseFunction2 = () => { // Function with error
    //     return new Promise(async (resolve, reject) => {
    //         try{
    //             var response = await fetch(`https://dummyjson.com/productsss`) 
    //             var data = await response.json();
    //             resolve("true")
    //         }catch(error){
    //             console.error("Some Error occured:" + error);
    //             reject(new Error("Some error occured"))
    //         }
    //     })
    // }


    // 2nd way of doing this, Better way

    // const promiseFunction1 = async () => {
    //     try {
    //         var response = await fetch(`https://dummyjson.com/products`)
    //         var data = await response.json();
    //         return data;
    //     } catch (error) {
    //         throw new Error(error)
    //     }
    // }

    // const promiseFunction2 = async () => { // Function with error
    //     try {
    //         var response = await fetch(`https://dummyjson.com/products`)
    //         var data = await response.json();
    //         return data;
    //     } catch (error) {
    //         throw new Error(error)
    //     }
    // }


    // 3rd Way Best way of doing this
    const promiseFunction1 = () => {
        return new Promise((resolve, reject)=> {
            // setTimeout(() => {
                fetch("https://dummyjson.com/products")
                .then((res) => {
                    if(res.ok){
                        return res.json();
                    }else{
                        throw new Error(res.status)
                    }
                })
                .then((data) => {
                    // resolve("Fetched Data successfully.")
                    resolve(data)
                })
                .catch((err)=> {
                    reject(err)
                })
            // }, 500)
        })
    }

    const promiseFunction2 = () => {
        return new Promise((resolve, reject)=> {
            // setTimeout(() => {
                fetch("https://dummyjson.com/products")
                .then((res) => {
                    if(res.ok){
                        return res.json();
                    }else{
                        throw new Error(res.status)
                    }
                })
                .then((data) => {
                    // resolve("Fetched Data successfully.")
                    resolve(data)
                    // console.log(data); 
                })
                .catch((err)=> {
                    reject(err)
                })
            // }, 2000)
        })
    }

    const onClickNext = () => {
        if ((skip + 10) < total) {
            fetchData(top, skip + 10);
            setSkip(prev => prev + 10);
        } else {
            window.alert("All records loaded")
        }
    }

    const onClickPrev = () => {
        if ((skip - 10) < total && skip - 10 >= 0) {
            fetchData(top, skip - 10);
            setSkip(prev => prev - 10);
        } else {
            window.alert("All records loaded")
        }
    }

    return (
        <div style={{ paddingTop: "1rem" }}>
            <table style={{ border: "1px solid grey", margin: "auto", width: "95%", textAlign: "center", fontFamily: "Roboto" }}>
                <tr>
                    <th>ID</th>
                    <th>Brand</th>
                    <th>Price ($)</th>
                    <th>Rating</th>
                    <th>SKU</th>
                </tr>
                <tbody>
                    {tableRows && tableRows.length !== 0 &&
                        tableRows.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.brand}</td>
                                <td>{item.price}</td>
                                <td>{item.rating}</td>
                                <td>{item.sku}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <div style={{ marginLeft: "auto" }}>
                <button onClick={onClickPrev}>
                    Previous
                </button>
                <button onClick={onClickNext}>
                    Next
                </button>

            </div>
        </div>
    )
}

export default Table;