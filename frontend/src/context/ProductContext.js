// src/ProductContext.js
import { createContext, useContext, useState } from 'react';

const SingleProductContext = createContext();

 const ProductProviderDetails = ({ children }) => {
  const [ThisProduct, setThisProduct] = useState(null);

  const setProduct = (productDetails) => {
    setThisProduct(productDetails);

  };

  return (
    <SingleProductContext.Provider value={{ setProduct, ThisProduct }}>
      {children}
    </SingleProductContext.Provider>
  );
};
 
export {SingleProductContext, ProductProviderDetails}
