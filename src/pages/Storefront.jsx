import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { getRestaurant } from '../data/restaurants.js'
import { useStore } from '../lib/store.jsx'
import { formatINR } from '../lib/pricing.js'
import SavingsCompare from '../components/SavingsCompare.jsx'

// Each restaurant's own branded mini-website. In production this would live at
// spiceroute.directdish.in or the restaurant's own domain.
export default function Storefront() {
  const { slug } = useParams()
  const r = getRestaurant(slug)
  const navigate = useNavigate()
  const { cart, cartItems, cartCount, cartSubtotal, addItem, removeItem } = useStore()
  const [tab, setTab] = useState('menu')
  const [vegOnly, setVegOnly] = useState(false)
  const [copied, setCopied] = useState(false)

  if (!r) {
    return (
      <div className="container section center">
        <h1>Restaurant not found</h1>
        <Link to="/" className="btn">Browse restaurants</Link>
      </div>
    )
  }

  const inThisCart = cart.slug === r.slug
  const qtyOf = (id) => (inThisCart ? cart.items[id]?.qty || 0 : 0)
  const otherCart = cart.slug && cart.slug !== r.slug

  const shareLink = `${window.location.origin}${window.location.pathname}#/r/${r.slug}`
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard can be blocked; ignore in the demo */
    }
  }

  return (
    <div className="storefront" style={{ '--brand': r.themeColor }}>
      <div className="sf-topbar">
        <div className="container row between">
          <span className="sf-brand">{r.logoEmoji} {r.name}</span>
          <span className="small">
            Powered by <Link to="/">DirectDish</Link> · 0% commission
          </span>
        </div>
      </div>

      <div className="sf-hero" style={{ backgroundImage: `url(${r.cover})` }}>
        <div className="sf-hero-overlay">
          <div className="container">
            <h1>{r.name}</h1>
            <p>{r.tagline}</p>
            <div className="sf-meta">
              <span>★ {r.rating} ({r.reviews.toLocaleString('en-IN')})</span>
              <span>⏱ {r.prepTime}</span>
              <span>📍 {r.area}</span>
              <span>🕒 {r.hours}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container sf-banner">
        <div>
          <strong>You're ordering directly from {r.name}.</strong> No platform fee, no menu markup.
          {r.offersDelivery
            ? ` Delivery within ${r.deliveryRadiusKm} km for ${formatINR(r.deliveryFee)}, or pick up free.`
            : ' Pickup only, ready when you arrive.'}
        </div>
        <div className="loyalty">
          🎁 Every {r.loyalty.everyNthOrder}th order: <strong>{r.loyalty.reward}</strong>
        </div>
      </div>

      <div className="container sf-layout">
        <div className="sf-main">
          <div className="tabs">
            <button className={tab === 'menu' ? 'active' : ''} onClick={() => setTab('menu')}>Menu</button>
            <button className={tab === 'story' ? 'active' : ''} onClick={() => setTab('story')}>Our story</button>
            <button className={tab === 'info' ? 'active' : ''} onClick={() => setTab('info')}>Info & share</button>
          </div>

          {tab === 'menu' && (
            <>
              <label className="veg-toggle">
                <input type="checkbox" checked={vegOnly} onChange={(e) => setVegOnly(e.target.checked)} /> Veg only
              </label>
              {r.menu.map((cat) => {
                const items = cat.items.filter((i) => !vegOnly || i.veg)
                if (!items.length) return null
                return (
                  <section key={cat.category} className="menu-cat">
                    <h3>{cat.category}</h3>
                    {items.map((item) => (
                      <div key={item.id} className="menu-item">
                        <div>
                          <div className="row gap-s">
                            <span className={`veg-dot ${item.veg ? 'veg' : 'nonveg'}`} />
                            <strong>{item.name}</strong>
                            {item.bestseller && <span className="badge">Bestseller</span>}
                          </div>
                          {item.desc && <p className="muted small">{item.desc}</p>}
                          <p>{formatINR(item.price)}</p>
                        </div>
                        {qtyOf(item.id) === 0 ? (
                          <button className="btn btn-brand" onClick={() => addItem(r.slug, item)}>Add</button>
                        ) : (
                          <div className="qty">
                            <button onClick={() => removeItem(item.id)}>−</button>
                            <span>{qtyOf(item.id)}</span>
                            <button onClick={() => addItem(r.slug, item)}>+</button>
                          </div>
                        )}
                      </div>
                    ))}
                  </section>
                )
              })}
            </>
          )}

          {tab === 'story' && (
            <section className="story">
              <p className="lead">{r.story}</p>
              <p className="muted">— {r.owner}, owner</p>
              <div className="gallery">
                {r.gallery.map((src) => (
                  <div key={src} className="gallery-img" style={{ backgroundImage: `url(${src})` }} />
                ))}
              </div>
              <p className="small muted">
                Real photos of the place, not stock templates. In the product, the owner uploads these from
                their phone during onboarding.
              </p>
            </section>
          )}

          {tab === 'info' && (
            <section className="info">
              <p><strong>Phone:</strong> {r.phone}</p>
              <p><strong>Hours:</strong> {r.hours}</p>
              <p><strong>Address:</strong> {r.area}</p>
              <p><strong>Order modes:</strong> {[r.offersDelivery && 'Delivery', r.offersPickup && 'Pickup'].filter(Boolean).join(', ')}</p>
              <div className="share-box">
                <div className="qr" aria-label="QR code placeholder">
                  {Array.from({ length: 49 }).map((_, i) => (
                    <span key={i} className={(i * 7 + r.slug.length * 3) % 3 === 0 ? 'on' : ''} />
                  ))}
                </div>
                <div>
                  <p><strong>This restaurant's own ordering link</strong></p>
                  <code className="small">{shareLink}</code>
                  <div><button className="btn" onClick={copy}>{copied ? 'Copied!' : 'Copy link'}</button></div>
                  <p className="small muted">Printed on bills, takeaway bags and table tents so regulars order direct next time.</p>
                </div>
              </div>
            </section>
          )}
        </div>

        <aside className="sf-cart">
          <h3>Your order</h3>
          {otherCart && (
            <p className="small warn">Adding items here will replace your cart from another restaurant.</p>
          )}
          {!inThisCart || cartCount === 0 ? (
            <p className="muted">Your cart is empty. Add something tasty.</p>
          ) : (
            <>
              {cartItems.map((i) => (
                <div key={i.id} className="cart-line">
                  <span>{i.qty} × {i.name}</span>
                  <span>{formatINR(i.qty * i.price)}</span>
                </div>
              ))}
              <div className="cart-line strong"><span>Subtotal</span><span>{formatINR(cartSubtotal)}</span></div>
              <SavingsCompare subtotal={cartSubtotal} deliveryFee={r.offersDelivery ? r.deliveryFee : 0} compact />
              <button className="btn btn-brand block" onClick={() => navigate(`/r/${r.slug}/checkout`)}>
                Checkout →
              </button>
            </>
          )}
        </aside>
      </div>

      {inThisCart && cartCount > 0 && (
        <button className="mobile-cart-bar" onClick={() => navigate(`/r/${r.slug}/checkout`)}>
          {cartCount} item{cartCount > 1 ? 's' : ''} · {formatINR(cartSubtotal)} — Checkout →
        </button>
      )}
    </div>
  )
}
