import { createContext as Context_Api, useState } from "react";

export const Context = Context_Api()

const AppContext = ({children}) =>{
    return(
        <Context.Provider>
            {children}
        </Context.Provider>
    )
}
export default AppContext