import { useContext } from 'react'

import Footer from '../footer/Footer'
import Header from '../header/Header'

import './Layout.css'
import Login from '../../auth/Login/Login'
import AuthContext from '../../auth/auth/AuthContext'
import Main from '../main/Main'


export default function Layout() {

    const authContext = useContext(AuthContext)

    const isLoggedIn = !!authContext?.token
    console.log("jwt from context:", authContext?.token)
    console.log("isLoggedIn:", isLoggedIn)

    return (
        
        <div className='Layout'>

            {isLoggedIn && <>
                <header>
                    <Header />
                </header>
                <main>
                    <Main />
                </main>
                <footer>
                    <Footer />
                </footer>
            </>}

            {!isLoggedIn && <Login />}
        </div>
    )
}