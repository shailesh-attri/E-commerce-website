import { createContext,useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
export const Context = createContext



const AppContext = ({children}) => {
    const [products, setProducts] = useState()
    const [cartSubTotal, setCartSubTotal] = useState(0)
    const location = useLocation()

    useEffect(()=>{})
  return (
    <Context.Provider
    value={{
        products,
        setProducts,
        cartSubTotal,
        setCartSubTotal
    }}
    >
{children}
    </Context.Provider>
  )
}

export default AppContext
