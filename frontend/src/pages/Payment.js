import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./payment.scss";
import Img1 from "../assets/items/img1-removebg-preview.png";
import logo from "../assets/logo.png";
import logoTitle from "../assets/logoimg.png";
import { FaArrowLeft } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Success from "./success";
const Payment = () => {
  const [openModal, setOpenModal] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);

  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [cartSubTotal, setCartSubTotal] = useState(0);

  useEffect(() => {
    if (location.state && location.state.cartItems) {
      setCartItems(location.state.cartItems);

      const subtotal = location.state.cartItems.reduce(
        (total, item) => total + item.productPrice * item.Value,
        0
      );
      setCartSubTotal(subtotal);
    }
  }, [location]);

  const checkout = (e) => {
    e.preventDefault();

    setOpenModal(true);
    // Use the stripe and elements objects to handle payment submission
    // Refer to the documentation of your chosen payment gateway for details
  };
  return (
    <div className="payment-container">
      <div className="payments">
        <div className="left-details">
          <div className="backToWebsite">
            <a className="logoDiv " href="http://localhost:3000/">
              <FaArrowLeft size="20" className="text-gray-600" />
              
              <img src={logoTitle} alt="" className="logoTitle" />
            </a>
          </div>
          <div className="pay">
            <div className="products">
              {cartItems.map((item, index) => (
                <div className="MyProduct" key={index}>
                  <img src={item.productImage} alt="" />
                  <div className="details">
                    <div className="subDetail">
                      <span className="line-lamb-1">{item.productName}</span>
                      <span>Quantity: {item.Value} </span>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <span>Price : {item.productPrice}</span>

                    <span className="flex gap-1">
                      <span> {item.Value} </span>
                      <span> x </span>
                      <span> ₹{item.Value * item.productPrice}</span>
                    </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="payToWebsite">
              <span className="">Subtotal</span>
              <span className="finalPrice">{`₹${cartSubTotal}`}</span>
            </div>
          </div>
        </div>

        <div className="right-details w-full">
          <button
            onClick={checkout}
            className="GPay flex items-center justify-center gap-1 text-center w-full "
          >
            <FcGoogle /> Pay
          </button>
          <div className="flex w-full items-center gap-2 py-3 text-sm text-slate-600">
            <div className="h-px w-full bg-slate-200"></div>
            OR
            <div className="h-px w-full bg-slate-200"></div>
          </div>
          <div className="formsDetails">
            <form className="" onSubmit={checkout}>
              <label htmlFor="email">
                Email
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                />
              </label>
              <label htmlFor="cardInfo">
                Card information
                <CardElement className="Card" />
              </label>

              <label htmlFor="Cardholder">
                Cardholder name
                <input
                  type="text"
                  id="Cardholder"
                  name="Cardholder"
                  placeholder="John Doe"
                  required
                />
              </label>

              <label htmlFor="COuntry-region">
                Country or region
                <select id="country-region" name="country-region" required>
                  <option value="usa">USA</option>
                  <option value="canada">China</option>
                  <option value="uk">India</option>
                  <option value="canada">Russia</option>
                  <option value="uk">Nepal</option>
                  <option value="canada">Australia</option>
                  <option value="uk">UK</option>
                </select>
              </label>
              {error && <div>{error}</div>}
              <button type="submit">Pay {`₹${cartSubTotal}`}</button>
            </form>
          </div>
        </div>
      </div>

      {openModal && <Success amount={cartSubTotal}></Success>}
    </div>
  );
};

export default Payment;
