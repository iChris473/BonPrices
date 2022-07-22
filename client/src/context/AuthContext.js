
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
            setLoggedIn(res.data)
            setAppLoading(false)

        } catch (error) {
            setAppLoading(false)
        }

    }

    useEffect(() => {
        getLoggedIn()
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