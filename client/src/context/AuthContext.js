
import {Children, createContext, useEffect, useState} from 'react'
import {publicRequest} from '../axioMethod'

const AuthContext = createContext()

const AuthContextProvider = ({children}) => {

    const [loggedIn, setLoggedIn] = useState(undefined)

    const getLoggedIn = async () => {
        try {
            const res = await publicRequest.get("/auth/loggedin")
            console.log(res.data)
            setLoggedIn(res.data)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getLoggedIn()
    }, [])

    return (
        <AuthContext.Provider value={{
            loggedIn,
            getLoggedIn
        }}>
            {children}
        </AuthContext.Provider>
    )

}

export {AuthContextProvider}
export default AuthContext