import React, { useState, useEffect } from "react";
import "./Cart.scss";
import { GiShoppingCart } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import CartItem from "./CartItem/CartItem";
import localforage from "localforage";
import { useWishlist } from "../../context/Wishlist-Cart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import { useFirebase } from "../../context/firebaseContext";
import Login from "../../pages/Login";
import {initializeDB } from '../../idb'
const Cart = ({ setShowCartList }) => {
  const [closeCart, setCloseCart] = useState(false);
  const [openSign, setOpenSign] = useState(false)
  const [isOpenModal, setOpenModal] = useState(false)
  const { user } = useFirebase();
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCartItems,
    updateCartCount,
    cartSubTotal,
    handleCartProductQuantity,
  } = useWishlist();

  const [itemCount, setItemCount] = useState(0);
  const isEmpty = cartItems.length === 0;

  

  const addToCartList = async (
    productName,
    productImage,
    productPrice,
    productOldPrice,
    Value
  ) => {
    console.log('Adding to cart:', productName);
    const isAlreadyInWishlist = cartItems.some(
      (item) =>
        item.productName === productName &&
        item.productImage === productImage &&
        item.productPrice === productPrice &&
        item.productOldPrice === productOldPrice
    );

    if (!isAlreadyInWishlist) {
      // Update IndexedDB
      try {
        const db = await initializeDB();
        console.log('Initialized DB');
        const transaction = db.transaction('cartItems', 'readwrite');
        const store = transaction.objectStore('cartItems');

        // Check if the item already exists in IndexedDB
        const existingItem = await store.get(productName);
        console.log('Existing item:', existingItem);
        if (!existingItem) {
          // If the item doesn't exist, add it to IndexedDB
          await store.add({
            productName,
            productImage,
            productPrice,
            productOldPrice,
            Value,
          });
          console.log('Item added to IndexedDB!');
        } else {
          console.log('Item already exists in IndexedDB!');
        }
        await new Promise((resolve) => {
          transaction.addEventListener('complete', resolve);
        });
  
        db.close();
        console.log('DB closed successfully');
      } catch (error) {
        console.error('Error adding item to IndexedDB: ', error);
      }

      // ... Update your context state, e.g., updateCartItems(updatedWishlist);
      updateCartCount(cartItems.length + 1);
    }
  };

  const handleClose = () => {
    setCloseCart(true);
    setShowCartList(false);
    
  };


  const handlePayment = async  () => {
    console.log("Current cart items:", cartItems);

  if (!user) {
    // If the user is not logged in, redirect to the login page
   
      console.log("Before setOpenSign(true)");
      navigate('/login')
      
      setTimeout(() => {
        console.log("After setOpenSign(true)");
        setShowCartList(false);
      }, 0)
      return;
    
  }
  if (isEmpty) {
    // Notify the user or take any appropriate action for an empty cart
    // For example, show a toast message
    console.log("Cart is empty. Showing toast message.");
    toast.error("Your cart is empty. Add items to proceed to checkout.");
    return;
  }

  // If the cart is not empty, navigate to the payment page
  console.log("Navigating to payment page.");
  navigate('/payment', { state: { cartItems } });
  setCloseCart(true);
  };
  
  return (
    <>
    {isOpenModal && <Login />}
      <ToastContainer position="bottom-left" autoClose={2000} />
      {!closeCart && (
        <div className={`cart-panel `}>
          <div className="opac-layer" onClick={handleClose}></div>
          <div className="cart-content">
            <div className="cart-header">
              <span className="heading">Shopping Cart</span>
              <span className="close-btn" onClick={handleClose}>
                <MdClose size="25" />
              </span>
            </div>

            <div className="ShoppingItems overflow-y-scroll">
              {isEmpty ? (
                <div className="empty-cart ">
                  <GiShoppingCart />
                  <span>Your cart is empty.</span>
                  <button className="return-cta" onClick={handleClose}>
                    Return to Shop
                  </button>
                </div>
              ) : (
                cartItems.map((cartItem, index) => (
                  <CartItem
                    cartItem={cartItem}
                    handleCartProductQuantity={handleCartProductQuantity}
                    removeFromCartItems={removeFromCartItems}
                    key={index}
                  />
                ))
              )}
            </div>

            <div className="cart-footer">
              <div className="subtotal">
                <span className="text">Subtotal:</span>
                {isEmpty ? (
                  <span className={`text total ChangeColor`}>&#8377;0</span>
                ) : (
                  <span className="text total">&#8377;{cartSubTotal}</span>
                )}
              </div>
              <div className="button">
                <button
                  className={`checkout-cta ${isEmpty ? "ChangeBg" : ""}`}
                  onClick={handlePayment }
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
