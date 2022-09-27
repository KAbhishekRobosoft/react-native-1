import React,{createContext, useState} from "react";

export const AuthContext= createContext()

export const AuthProvider= ({children})=>{
    const [isLoading,setisLoading]= useState(true)
    const [userToken,setuserToken]= useState(null)

    const login= ()=>{
        setuserToken('ioiojlkad')
        setisLoading(false)
    }

    const logout= ()=>{
        setuserToken(null)
        setisLoading(false)
    }

    return (

        <AuthContext.Provider value={{login,logout,isLoading,userToken}}>
            {children}
        </AuthContext.Provider>
    )
}