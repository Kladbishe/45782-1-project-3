import { createContext } from "react"

interface AuthContextInterface {
    token: string,
    newToken(token: string): void
}

const AuthContext = createContext<AuthContextInterface | null>(null)
export default AuthContext

