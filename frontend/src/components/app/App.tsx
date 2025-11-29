import { BrowserRouter } from 'react-router-dom'

import './App.css'
import Auth from '../auth/auth/Auth'
import Layout from '../layout/layout/Layout'


function App() {

    return (
        <BrowserRouter>
            <Auth>
                 <Layout />
            </Auth>
        </BrowserRouter>
    )
}

export default App
