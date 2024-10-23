import React from "react";


const IntervalForm = ({  handleInputChange, timer, interval, setIntervalValue }) => {

    const resetTime =(e)=>{
        setIntervalValue(e.target.value)
    }

    return (
        <>
            <div className="interval-container">
                <div className="interval-flexbox">
                    <h1 className="interval-heading">Transactions</h1>
                    <p className="interval-para">Enter the interval in minutes</p>

                    <input type="number" name="interval" className="interval-input" value={interval}
                        onChange={(e)=>{resetTime(e)}} />

                    <div
                        className="interval-btn"
                    >
                        <button className="clipButton font-[Nippo]" onClick={handleInputChange}>
                            Set Interval
                        </button>

                    </div>
                    {timer >0 && (
                        <p className="interval-timerPara">Your transaction will be refreshed in {timer/1000} seconds</p>
                    )}
                </div>
            </div>
        </>
    );
}
export default IntervalForm; 