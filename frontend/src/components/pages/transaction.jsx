import React, { useState, useEffect } from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../views/footer";
import IntervalForm from "../common/intervalForm/intervalForm";
import TransactionTable from "../common/transactionTable/transactionTable";

const Transaction = () => {
  const [interval, setIntervalValue] = useState(0);
  const [data, setData] = useState([]);
  const [timer, setTimer] = useState(0);

  // Function to handle input changes
  const handleInputChange = () => {

    setTimer(interval); // Set the timer value
    setIntervalValue(interval); // Save the interval value
  };

  // useEffect to handle the timer countdown
  useEffect(() => {
    if (timer > 0) {
      const timeout = setTimeout(() => {
        setTimer((prevTimer) => prevTimer - 1000); // Decrease timer by 1 second (1000 ms)
      }, 1000);
      
      return () => clearTimeout(timeout); // Cleanup timeout
    } else if (timer === 0 && interval !== 0) {
      getNetworkTransactions(); // Fetch data when timer reaches 0
      setIntervalValue(0); // Reset interval value
    }
  }, [timer]);

  // Fetching network transactions
  const getNetworkTransactions = async () => {
    try {
      const response = await fetch("http://localhost:2020/api/whales/getTopWhales/56", {
        method: "GET",
      });
      const res = await response.json();
      setData(res);
      console.log("Fetched data successfully:", res);
    } catch (error) {
      console.error("Error fetching network transactions:", error);
    }
  };

  useEffect(() => {
    getNetworkTransactions(); // Fetch data on component mount
  }, []);

  return (
    <>
      <Navbar />
      <IntervalForm
        interval={interval}
        timer={timer}
        handleInputChange={handleInputChange}
        setIntervalValue={setIntervalValue}
      />
      {data && <TransactionTable whales={data} />}
      <Footer />
    </>
  );
};

export default Transaction;
