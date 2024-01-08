// WishlistContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import localforage from 'localforage';
import { useLocation } from "react-router-dom";
const WishlistContext = createContext();


export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartSubTotal, setCartSubTotal] = useState(0)
  const [currentProduct, setCurrentProduct] = useState([])
  const location = useLocation();

  useEffect(() => {
      window.scrollTo(0, 0);
  }, [location]);
  useEffect(() => {
    let subTotal = 0;
    cartItems.forEach((item) => {
        // Assuming item.productPrice is the price and item.Value is the quantity
        subTotal += item.productPrice * item.Value;
    });

    // Assuming you have a setCartSubTotal function
    setCartSubTotal(subTotal);
}, [cartItems]);

  const addToWishlist = (product) => {
    const updatedWishlist = [...wishlistItems, product];
    setWishlistItems(updatedWishlist);
  };
  const addToCartList = (product) => {
   
    const updatedWishlist = [...cartItems, product];
    setCartItems(updatedWishlist);
    
  };
  const addToProductDetail= (product) => {
   
    const updateProductDetail = [...currentProduct, product];
    setCurrentProduct(updateProductDetail);
    
  };

  const removeFromWishlist = (productName) => {
    const updatedWishlist = wishlistItems.filter((item) => item.productName !== productName);
    localforage.setItem('wishlistItems', updatedWishlist);
    setWishlistItems(updatedWishlist);
  };
  
  const removeFromCartItems = (productName) => {
    const updatedCartList = cartItems.filter((item) => item.productName !== productName);
    localforage.setItem('cartItems', updatedCartList);
    setCartItems(updatedCartList);
  };
  

  const handleCartProductQuantity = (type, product) => {
    let items = [...cartItems];
    let index = items?.findIndex((p) => p.id === product?.id);
    if (type === "inc") {
      items[index].Value += 1;
    } else if (type === "dec") {
      if (items[index].Value === 1) return;
      items[index].Value -= 1;
    }
    setCartItems(items);
  };

  return (
    <WishlistContext.Provider value={{ 
      wishlistItems, 
      addToWishlist, 
      removeFromWishlist,  
      removeFromCartItems,
      addToCartList,
      cartItems,
      cartSubTotal,
      handleCartProductQuantity ,
      addToProductDetail,
      currentProduct
      }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

