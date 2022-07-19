
import { createContext, useEffect, useState } from 'react'
import {publicRequest} from '../axioMethod'

const SuperContext = createContext()

const SuperContextProvider = ({children}) => {

    const [appLoading, setAppLoading] = useState(false)
    
    const [loggedIn, setLoggedIn] = useState(true)

    const getLoggedIn = async () => {

        try {
            setAppLoading(true)
            const res = await publicRequest.get("/super/auth/verifylog")
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
        <SuperContext.Provider value={{
            loggedIn,
            getLoggedIn,
            appLoading
        }}>
            {children}
        </SuperContext.Provider>
    )

}

export {SuperContextProvider}
export default SuperContext