
import { createContext, useEffect, useState } from 'react'
import {publicRequest} from '../axioMethod'

const AuthContext = createContext()

const AuthContextProvider = ({children}) => {

    const [appLoading, setAppLoading] = useState(false)
    
    const [loggedIn, setLoggedIn] = useState(true)

    const [networkError, setNetworkError] = useState(true)

    const getLoggedIn = async () => {

        try {

            setAppLoading(true)

            const res = await publicRequest.get("/auth/loggedin")
            
            if(res.data.deactivated){
                window.location.href = "/admin/deactivated"
                return
            }

            setLoggedIn(res.data)

            setAppLoading(false)

        } catch (error) {
            setAppLoading(false)
        }

    }
    const getActivated = async () => {

        try {

            setAppLoading(true)

            const res = await publicRequest.get("/auth/loggedin")
            
            if(!res.data.deactivated){
                window.location.href = "/admin#"
                return
            }

        } catch (error) {
            setAppLoading(false)
        }

    }

    useEffect(() => {
        window.location.href.includes("deactivated") ? getActivated() : getLoggedIn()
    }, [])

    return (
        <AuthContext.Provider value={{
            loggedIn,
            getLoggedIn,
            appLoading
        }}>
            {children}
        </AuthContext.Provider>
    )

}

export {AuthContextProvider}
export default AuthContext