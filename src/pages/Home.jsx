import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { restaurants, allCuisines } from '../data/restaurants.js'
import RestaurantCard from '../components/RestaurantCard.jsx'

export default function Home() {
  const [q, setQ] = useState('')
  const [cuisine, setCuisine] = useState('All')
  const [mode, setMode] = useState('any')

  const list = useMemo(() => {
    const term = q.trim().toLowerCase()
    return restaurants.filter((r) => {
      if (cuisine !== 'All' && !r.cuisine.includes(cuisine)) return false
      if (mode === 'delivery' && !r.offersDelivery) return false
      if (mode === 'pickup' && !r.offersPickup) return false
      if (!term) return true
      const hay = [r.name, r.area, ...r.cuisine, ...r.menu.flatMap((c) => c.items.map((i) => i.name))]
        .join(' ')
        .toLowerCase()
      return hay.includes(term)
    })
  }, [q, cuisine, mode])

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div>
            <h1>
              Order straight from the restaurant.
              <br />
              <span className="accent">No middleman. No extra fees.</span>
            </h1>
            <p className="lead">
              Delivery apps take up to 30% from restaurants and add platform, packaging and surge fees
              for you. On DirectDish you pay the menu price, and the restaurant keeps every rupee.
            </p>
            <div className="hero-stats">
              <div><strong>0%</strong><span>commission</span></div>
              <div><strong>₹0</strong><span>platform fee</span></div>
              <div><strong>100%</strong><span>to the kitchen</span></div>
            </div>
          </div>
          <div className="hero-card">
            <p className="small muted">Same ₹800 dinner</p>
            <div className="savings-row"><span>Delivery app</span><span className="strike">≈ ₹1,010</span></div>
            <div className="savings-row strong"><span>DirectDish</span><span>≈ ₹830</span></div>
            <p className="small">Illustrative. See <Link to="/how-it-works">how we got these numbers</Link>.</p>
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="filters">
          <input
            className="input"
            placeholder="Search restaurants, dishes, areas…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <select className="input" value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
            <option>All</option>
            {allCuisines.map((c) => <option key={c}>{c}</option>)}
          </select>
          <div className="seg">
            {['any', 'delivery', 'pickup'].map((m) => (
              <button key={m} className={mode === m ? 'active' : ''} onClick={() => setMode(m)}>
                {m === 'any' ? 'All' : m[0].toUpperCase() + m.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <h2>Restaurants near you</h2>
        {list.length === 0 ? (
          <p className="muted">No restaurants match. Try another search.</p>
        ) : (
          <div className="grid">
            {list.map((r) => <RestaurantCard key={r.slug} r={r} />)}
          </div>
        )}
      </section>

      <section className="container section">
        <h2>How it works</h2>
        <div className="steps">
          <div className="step"><span>1</span><h4>Find your favourite place</h4><p>Here, through its own link, or by scanning the QR on the bill or the takeaway bag.</p></div>
          <div className="step"><span>2</span><h4>Order from its own storefront</h4><p>Real photos, the owner's story, the actual menu at actual prices.</p></div>
          <div className="step"><span>3</span><h4>Pay the restaurant directly</h4><p>UPI goes straight to the restaurant. Pick up, or get it delivered by their rider or a delivery partner at cost.</p></div>
        </div>
      </section>

      <section className="container section cta">
        <div>
          <h2>Own a restaurant?</h2>
          <p>Get your own ordering website in a day. One flat monthly fee, zero commission, and your customers stay yours.</p>
        </div>
        <Link to="/partner" className="btn btn-primary">See the restaurant dashboard →</Link>
      </section>
    </>
  )
}
