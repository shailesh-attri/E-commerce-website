import React,{createContext, useContext, useState} from "react";
const FilterContext = createContext()
const FilterProvider= ({children}) => {
const [data, setData] = useState(null)


return (
    <FilterContext.Provider value={{data,setData}}>
        {children}
    </FilterContext.Provider>
)
}
export {FilterContext, FilterProvider}