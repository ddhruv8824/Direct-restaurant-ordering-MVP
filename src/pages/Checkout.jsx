import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getRestaurant } from '../data/restaurants.js'
import { useStore } from '../lib/store.jsx'
import { formatINR, aggregatorTotal } from '../lib/pricing.js'

export default function Checkout() {
  const { slug } = useParams()
  const r = getRestaurant(slug)
  const navigate = useNavigate()
  const { cart, cartItems, cartSubtotal, placeOrder } = useStore()

  const [mode, setMode] = useState(r?.offersDelivery ? 'delivery' : 'pickup')
  const [form, setForm] = useState({ name: '', phone: '', address: '', notes: '', pickupIn: '20' })
  const [pay, setPay] = useState('upi')
  const [error, setError] = useState('')

  if (!r) return <div className="container section">Restaurant not found.</div>
  if (cart.slug !== r.slug || cartItems.length === 0) {
    return (
      <div className="container section center">
        <h2>Your cart is empty</h2>
        <Link className="btn" to={`/r/${r.slug}`}>Back to {r.name}</Link>
      </div>
    )
  }

  const deliveryFee = mode === 'delivery' ? r.deliveryFee : 0
  const total = cartSubtotal + deliveryFee
  const appTotal = aggregatorTotal(cartSubtotal)
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !/^\+?[\d\s-]{10,}$/.test(form.phone.trim())) {
      setError('Please enter your name and a valid phone number.')
      return
    }
    if (mode === 'delivery' && !form.address.trim()) {
      setError('Please enter a delivery address.')
      return
    }
    const id = placeOrder({
      slug: r.slug,
      restaurantName: r.name,
      customer: { name: form.name, phone: form.phone, address: form.address },
      notes: form.notes,
      mode,
      pickupIn: form.pickupIn,
      payment: pay,
      items: cartItems,
      subtotal: cartSubtotal,
      deliveryFee,
      total,
      savedVsApp: appTotal - total,
    })
    navigate(`/order/${id}`)
  }

  return (
    <div className="storefront" style={{ '--brand': r.themeColor }}>
      <div className="sf-topbar">
        <div className="container row between">
          <Link to={`/r/${r.slug}`} className="sf-brand">← {r.logoEmoji} {r.name}</Link>
          <span className="small">Secure checkout · paid directly to the restaurant</span>
        </div>
      </div>

      <form className="container checkout" onSubmit={submit}>
        <div className="checkout-main">
          <h2>How do you want it?</h2>
          <div className="seg big">
            <button type="button" disabled={!r.offersDelivery} className={mode === 'delivery' ? 'active' : ''} onClick={() => setMode('delivery')}>
              🛵 Delivery {r.offersDelivery ? `(${formatINR(r.deliveryFee)})` : '(not offered)'}
            </button>
            <button type="button" className={mode === 'pickup' ? 'active' : ''} onClick={() => setMode('pickup')}>
              🥡 Pickup (free)
            </button>
          </div>

          <h2>Your details</h2>
          <div className="form-grid">
            <input className="input" placeholder="Name" value={form.name} onChange={set('name')} />
            <input className="input" placeholder="Phone (for order updates on WhatsApp/SMS)" value={form.phone} onChange={set('phone')} />
            {mode === 'delivery' ? (
              <textarea className="input full" rows={2} placeholder="Delivery address" value={form.address} onChange={set('address')} />
            ) : (
              <select className="input full" value={form.pickupIn} onChange={set('pickupIn')}>
                <option value="20">Ready in ~20 min</option>
                <option value="40">Ready in ~40 min</option>
                <option value="60">Ready in ~1 hour</option>
              </select>
            )}
            <input className="input full" placeholder="Notes for the kitchen (less spicy, no onion…)" value={form.notes} onChange={set('notes')} />
          </div>

          <h2>Payment</h2>
          <div className="pay-options">
            <label className={pay === 'upi' ? 'active' : ''}>
              <input type="radio" name="pay" checked={pay === 'upi'} onChange={() => setPay('upi')} />
              <div><strong>UPI to the restaurant</strong><p className="small muted">Goes straight to {r.name}'s account. No gateway cut.</p></div>
            </label>
            <label className={pay === 'card' ? 'active' : ''}>
              <input type="radio" name="pay" checked={pay === 'card'} onChange={() => setPay('card')} />
              <div><strong>Card / netbanking</strong><p className="small muted">Gateway charges passed through at cost (~2%), paid by the restaurant.</p></div>
            </label>
            <label className={pay === 'cash' ? 'active' : ''}>
              <input type="radio" name="pay" checked={pay === 'cash'} onChange={() => setPay('cash')} />
              <div><strong>{mode === 'pickup' ? 'Pay at counter' : 'Cash on delivery'}</strong><p className="small muted">Pay when you get your food.</p></div>
            </label>
          </div>
          {error && <p className="warn">{error}</p>}
        </div>

        <aside className="sf-cart">
          <h3>Bill</h3>
          {cartItems.map((i) => (
            <div key={i.id} className="cart-line"><span>{i.qty} × {i.name}</span><span>{formatINR(i.qty * i.price)}</span></div>
          ))}
          <hr />
          <div className="cart-line"><span>Items (menu price)</span><span>{formatINR(cartSubtotal)}</span></div>
          <div className="cart-line"><span>Delivery</span><span>{deliveryFee ? formatINR(deliveryFee) : 'Free'}</span></div>
          <div className="cart-line"><span>Platform fee</span><span className="green">₹0</span></div>
          <div className="cart-line"><span>Packaging / surge / "small cart" fee</span><span className="green">₹0</span></div>
          <div className="cart-line strong big"><span>To pay</span><span>{formatINR(total)}</span></div>
          <div className="savings-saved">≈ {formatINR(appTotal - total)} less than a typical delivery app</div>
          <div className="money-split small">
            <p><strong>Where your money goes</strong></p>
            <p>🍳 {r.name}: {formatINR(cartSubtotal)} (100% of food)</p>
            {deliveryFee > 0 && <p>🛵 Rider / delivery partner: {formatINR(deliveryFee)}</p>}
            <p>🏢 DirectDish: ₹0 from this order</p>
          </div>
          <button className="btn btn-brand block" type="submit">Place order · {formatINR(total)}</button>
          <p className="small muted center">Demo only. No real payment is taken.</p>
        </aside>
      </form>
    </div>
  )
}
