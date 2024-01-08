// productDetail.js (context file)
import React, { createContext, useContext, useReducer } from 'react';

const ProductContext = createContext();

const productReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PRODUCT_DATA':
      return {
        ...state,
        selectedProduct: action.payload,
      };
    default:
      return state;
  }
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, {
    selectedProduct: null,
  });

  const setProductData = (productData) => {
    dispatch({
      type: 'SET_PRODUCT_DATA',
      payload: productData,
    });
  };

  return (
    <ProductContext.Provider value={{ ...state, setProductData }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  return useContext(ProductContext);
};
