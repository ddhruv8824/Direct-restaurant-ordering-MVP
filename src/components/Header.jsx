import { Link, NavLink } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'

export default function Header() {
  const { cart, cartCount } = useStore()
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand">
          <span className="brand-mark">🍽️</span> DirectDish
        </Link>
        <nav className="nav">
          <NavLink to="/" end className={({ isActive }) => `hide-sm${isActive ? " active" : ""}`}>Restaurants</NavLink>
          <NavLink to="/how-it-works">How it works</NavLink>
          <NavLink to="/partner">For restaurants</NavLink>
          {cartCount > 0 && cart.slug && (
            <Link to={`/r/${cart.slug}/checkout`} className="cart-pill">
              🛒 {cartCount}
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
