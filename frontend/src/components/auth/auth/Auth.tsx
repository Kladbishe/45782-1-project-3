import { useState, type PropsWithChildren } from "react";
import AuthContext from "./AuthContext";

export default function Auth(props: PropsWithChildren) {

    const [token, setToken] = useState<string>(localStorage.getItem('token') || '')

    const { children } = props

    function newToken(token: string) {
        setToken(token)
        localStorage.setItem('token', token)
    }

    return (
        <AuthContext.Provider value={{ token, newToken }}>
            {children}
        </AuthContext.Provider>
    )
}