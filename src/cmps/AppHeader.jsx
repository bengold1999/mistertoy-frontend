import { useDispatch, useSelector } from 'react-redux'

import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import logoImg from '../assets/img/logo.png'
import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'
import Avatar from '@mui/material/Avatar';


import { TOGGLE_CART_IS_SHOWN } from '../store/reducers/toy.reducer.js'

export function AppHeader() {

    const [isNavVisible, setIsNavVisible] = useState(true)
    const [isUserVisible, setIsUserVisible] = useState(true)
    const dispatch = useDispatch()
    const user = useSelector(storeState => storeState.userModule.loggedInUser)

    const toggleNavBar = () => {
        setIsNavVisible(!isNavVisible)

    }

    function onLogout() {
        logout()
            .then(() => {
                showSuccessMsg('logout successfully')
            })
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }
    const toggleUserBar = () => {
        setIsUserVisible(!isUserVisible)

    }
  

    return (
        <header className=" flex space-between align-center">
            <section className='left-header flex align-center '>
                <div className='nav-container-ben'>
                    <span className="fa-solid fa-bars"
                        src=""
                        title="navigation to other pages"
                        alt=""
                        onClick={toggleNavBar} ></span>
                    {!isNavVisible && (<nav className="main-nav">
                        <NavLink to="/" >Home</NavLink>
                        <NavLink to="/about" >About</NavLink>
                        <NavLink to="/toy" >Toys</NavLink>
                        <NavLink to="/cart" >Cart</NavLink>
                        <NavLink to="/review" >R&G</NavLink>
                    </nav>)}
                </div>
                <img className='logo' src={logoImg} alt="" />
            </section>
            {/* <a onClick={onToggleCart} href="">🛒 Cart</a> */}
            <div>
                {user?<Avatar className='font-larger' onClick={toggleUserBar}>{user.fullname.charAt(0)}</Avatar>:''}
                {!isUserVisible && user &&
                    < section className='user-low-d' >
                        <Link className='add-btn' to={`/user/${user._id}`}>Hello {user.fullname} <span></span></Link>
                        <span>{user.score}$</span>
                        <NavLink to="/cart" >My cart</NavLink>
                        <button onClick={onLogout}>Logout</button>
                    </ section >

                }
            <section>
                {!user && <LoginSignup />}
            </section>
            </div>

        </header>
    )
}