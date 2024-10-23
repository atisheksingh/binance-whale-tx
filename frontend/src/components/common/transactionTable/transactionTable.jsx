import React, { useState, useEffect } from "react";

function TransactionTable(props) {
  const [whalesData, setWhalesData] = useState([]);
  useEffect(()=>{

setWhalesData(props.whales);
  },[props])

  return (
    <table style={{width:"100%", backgroundColor:"rgb(17, 42, 68)", marginTop:"3rem", padding:"0 1rem 0 1rem"}}>
      <thead>
        <tr className='table-row'>
          <th className='table-head'>HASH</th>
          <th className='table-head'>AMOUNT</th>
          <th className='table-head'>SENDER</th>
          <th className='table-head'>TO</th>
          <th className='table-head'>Value In USD</th>
        </tr>
      </thead>
      <tbody>
        {whalesData?.map((row, index) => (
          <tr key={index} className='table-row' style={{height:"50px"}}>
            <td className='table-data'>{row?.Transaction?.Hash}</td>
            <td className='table-data'>{row?.Transaction?.Value}</td>
            <td className='table-data'>{row?.Transaction?.From}</td>
            <td className='table-data'>{row?.Transaction?.To}</td>
            <td className='table-data'>{row?.Transaction?.ValueInUSD}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TransactionTable;