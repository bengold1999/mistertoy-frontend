
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
export function AppHeader() {

    const [isNavVisible, setIsNavVisible] = useState(true)
    // const [isUserVisible, setIsUserVisible] = useState(true)

    const toggleNavBar = () => {
        setIsNavVisible(!isNavVisible)

    }
    // const toggleUserBar = () => {
    //     setIsUserVisible(!isUserVisible)

    // }

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

                    </nav>)}
                </div>
                <img className='logo' src="src\assets\img\logo.png" alt="" />
            </section>
        </header>
    )
}