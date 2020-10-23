import React, { useMemo, useState } from 'react'
import AppContext from "./Context"

export const AppProvider = ({children}) => {    
    const [isAuthenticated, setAuthenticated] = useState(()=> {
        let isvalue = sessionStorage.getItem("@login")
        return isvalue ? true : false
    })

    const value = useMemo(()=> ({
        isAuthenticated,
        setAuthenticated
    }),[isAuthenticated])
    

    return (
        <AppContext.Provider value={value}>
           {children}
        </AppContext.Provider>
    )
}