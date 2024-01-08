import { createContext, useState } from "react";
const BrandFilterContext = createContext();

const BrandFilterProvider = ({ children }) => {
  const [ThisBrand, setThisBrand] = useState("");
  const [ThisNumber, setThisNumber] = useState("");

  const setBrand = (data) => {
    setThisBrand(data);
  };
  const setNumber = (data)=>{
    setThisNumber(data)
  }
  
  return (
    <BrandFilterContext.Provider value={{ ThisBrand, setBrand,ThisNumber,setNumber }}>
      {children}
    </BrandFilterContext.Provider>
  );
};
export { BrandFilterContext, BrandFilterProvider };
