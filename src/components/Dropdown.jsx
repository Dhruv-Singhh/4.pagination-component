import React, { useState } from 'react'

const Dropdown = ({data, selectedVal ,setSelectedVal}) => {

    const onSelectionChange = (e) => {
        setSelectedVal(e.target.value);
    }
    
  return (
    <div>
        <select value={selectedVal} onChange={onSelectionChange} name='countries' style={{width:"20rem"}}>
            {data.map(item => {
                return (<option value={item}> {item} </option>)
            })}
        </select>
    </div>
  )
}

export default Dropdown