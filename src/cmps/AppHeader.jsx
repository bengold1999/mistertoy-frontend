
import { NavLink } from 'react-router-dom'

export function AppHeader(){
    return (
        <header className="app-header full main-layout">
      <section className="header-container">
                <h1>BenoToys</h1>
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/toy" >Toys</NavLink>
                    {/* <a onClick={onToggleCart} href="#">🛒 Cart</a> */}

                </nav>
            </section>
        </header>
    )
}