import React, { useEffect, useLayoutEffect, useState } from "react";

const Table = ({ }) => {
    const [tableRows, setTableRows] = useState([]);
    const [skip, setSkip] = useState(0);
    const [top, setTop] = useState(10);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        var aPromises = [promiseFunction1(), promiseFunction2()];
        Promise.allSettled(aPromises).then(function (values) { // Testing out Promises
            console.log(values)
            if (values && values.length !== 0) {
                var flag = values.some((item) => item.status === "rejected")
            }
            if (!flag) {
                fetchData(top, skip);
            }
        })
    }, []);

    const fetchData = async (limit, skip) => {
        try {
            const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
            const tableData = await response.json();
            setTableRows(tableData.products);
            setTotal(tableData.total);
            console.log(tableData);
        } catch (error) {
            setTableRows([]);
            console.error("Error fetching table data:", error);
        }
    };


    // 1st of doing this
    // const promiseFunction1 = () => { // Correct function 
    //     return new Promise(async (resolve, reject) => {
    //         try{
    //             var response = await fetch(`https://dummyjson.com/products`)
    //             var data = await response.json();
    //             resolve("true")
    //         }catch(error){
    //             console.error("Some Error occured:" + error);
    //             reject("false")
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
    //             reject("false")
    //         }
    //     })
    // }


    // 2nd way of doing this, Better way

    const promiseFunction1 = async () => { // Correct function 
        try {
            var response = await fetch(`https://dummyjson.com/products`)
            var data = await response.json();
            return data;
        } catch (error) {
            throw new Error(error)
        }
    }

    const promiseFunction2 = async () => { // Function with error
        try {
            var response = await fetch(`https://dummyjson.com/productsss`)
            var data = await response.json();
            return data;
        } catch (error) {
            throw new Error(error)
        }
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