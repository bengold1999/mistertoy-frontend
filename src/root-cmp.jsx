import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'

import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { store } from './store/store.js'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { UserDetails } from './pages/UserDetails.jsx'
import { ShoppingCart } from './cmps/ShoppingCart.jsx'
import { ReviewIndex } from './pages/ReviewIndex.jsx'


import './assets/scss/main.scss'

export function App() {
    return (
        <Provider store={store}>
            <Router>
                <section className="app">
                    <AppHeader />
                    <main className='main-layout'>
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                            <Route element={<AboutUs />} path="/about" />
                            <Route element={<ToyIndex />} path="/toy" />
                            <Route element={<ToyEdit />} path="/toy/edit" />
                            <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
                            <Route element={<ToyDetails />} path="/toy/:toyId" />
                            <Route element={<UserDetails />} path="/user/:userId" />
                            <Route element={<ShoppingCart />} path="/cart" />
                            <Route element={<ReviewIndex />} path="/review" />

                            {/* <Route element={<UserDetails />} path="/user/:userId" />  */}
                        </Routes>
                    </main>
                    <UserMsg />
                    <AppFooter />
                </section>
            </Router>
        </Provider>

    )
}



