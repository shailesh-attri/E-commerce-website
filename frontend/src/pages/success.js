import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa6";
import "./success.scss";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";
const Success = ({amount}) => {
  const navigate = useNavigate();
  const [showInfinitySpin, setShowInfinitySpin] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      // After 3 seconds, hide the InfinitySpin
      setShowInfinitySpin(false);
    }, 3000);

    return () => clearTimeout(timer); // Clear the timer on component unmount

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures the effect runs only once

  const navigateTo = () => {
    // Handle navigation logic here
    // For example, navigate to the home page
    navigate("/");
  };
  return (
    <div className="MainContainer">
      <div className="opacLayer"></div>
      <div className="container ">
        <div className="success-msg">
          <h1 className="flex items-center gap-5 Processing">
            {showInfinitySpin ? (
              <div className="orderPlaced">
                <InfinitySpin
                  visible={true}
                  width={200}
                  color="#4fa94d"
                  ariaLabel="infinity-spin-loading"
                />
                <span>Processing payment of ₹{amount}</span>
              </div>
            ) : (
              <div className="orderPlaced ">
                <FaCheck
                  size="50"
                  className="text-green-500 rounded border-2 border-green-500"
                />
                <span className="flex items-center justify-center ] ">Your order has</span>
                <span className="flex items-center justify-center  ">been placed</span>
              </div>
            )}
          </h1>

      
            <>
              <h1 className="text-xl Thanks">Thank you for shopping with us!</h1>
             
              <button
                className={`flex gap-2 items-center justify-center ${showInfinitySpin ? 'ChangeBg' : ''}`}
                onClick={navigateTo}
              >
                <FaArrowLeft size="20" className="" /> <span>Go back</span>
              </button>
              <span className="help text-gray-400">
                If you have any questions or concerns, please contact our
                customer support. Thank you for choosing SonicSounds!
              </span>
            </>
         
        </div>
      </div>
    </div>
  );
};

export default Success;
