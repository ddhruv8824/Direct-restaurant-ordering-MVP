import { useState } from 'react'
import { Link } from 'react-router-dom'
import { restaurants } from '../data/restaurants.js'
import { sampleOrders, customers, plans } from '../data/mockOps.js'
import { useStore } from '../lib/store.jsx'
import { formatINR, monthlyComparison, AGGREGATOR, DIRECT } from '../lib/pricing.js'

const NEXT = {
  placed: 'accepted', accepted: 'preparing',
  preparing: { delivery: 'out_for_delivery', pickup: 'ready' },
  out_for_delivery: 'delivered', ready: 'picked_up',
}
const STATUS_LABEL = {
  placed: 'New', accepted: 'Accepted', preparing: 'Preparing', out_for_delivery: 'Out for delivery',
  delivered: 'Delivered', ready: 'Ready', picked_up: 'Picked up',
}

export default function Partner() {
  const [slug, setSlug] = useState(restaurants[0].slug)
  const [tab, setTab] = useState('orders')
  const r = restaurants.find((x) => x.slug === slug)

  return (
    <div className="container section">
      <div className="row between wrap">
        <div>
          <p className="muted small">Restaurant dashboard (demo)</p>
          <h1>{r.logoEmoji} {r.name}</h1>
        </div>
        <div className="row gap-s">
          <select className="input" value={slug} onChange={(e) => setSlug(e.target.value)}>
            {restaurants.map((x) => <option key={x.slug} value={x.slug}>{x.name}</option>)}
          </select>
          <Link to={`/r/${r.slug}`} className="btn">View my storefront ↗</Link>
        </div>
      </div>

      <div className="tabs">
        {[['orders', 'Live orders'], ['menu', 'Menu'], ['customers', 'Customers'], ['earnings', 'Earnings'], ['setup', 'Storefront setup'], ['plans', 'Plans']].map(([k, label]) => (
          <button key={k} className={tab === k ? 'active' : ''} onClick={() => setTab(k)}>{label}</button>
        ))}
      </div>

      {tab === 'orders' && <Orders r={r} />}
      {tab === 'menu' && <MenuManager key={r.slug} r={r} />}
      {tab === 'customers' && <Customers r={r} />}
      {tab === 'earnings' && <Earnings />}
      {tab === 'setup' && <Setup r={r} />}
      {tab === 'plans' && <Plans />}
    </div>
  )
}

function Orders({ r }) {
  const { orders, updateOrderStatus } = useStore()
  const [mock, setMock] = useState(sampleOrders)
  const real = orders
    .filter((o) => o.slug === r.slug)
    .map((o) => ({
      id: o.id, customer: o.customer.name,
      items: o.items.map((i) => `${i.qty} × ${i.name}`).join(', '),
      total: o.total, mode: o.mode, status: o.status,
      minsAgo: Math.max(0, Math.round((Date.now() - o.placedAt) / 60000)), real: true,
    }))
  const all = [...real, ...(r.slug === 'spice-route' ? mock : [])]

  const advance = (o) => {
    const n = NEXT[o.status]
    const next = typeof n === 'object' ? n[o.mode] : n
    if (!next) return
    if (o.real) updateOrderStatus(o.id, next)
    else setMock((m) => m.map((x) => (x.id === o.id ? { ...x, status: next } : x)))
  }

  const today = all.reduce((s, o) => s + o.total, 0)
  return (
    <>
      <div className="kpis">
        <div className="kpi"><span>Orders today</span><strong>{all.length}</strong></div>
        <div className="kpi"><span>Sales today</span><strong>{formatINR(today)}</strong></div>
        <div className="kpi"><span>Commission paid</span><strong className="green">₹0</strong></div>
        <div className="kpi"><span>Would've paid on apps</span><strong className="red">{formatINR(today * AGGREGATOR.commission)}</strong></div>
      </div>
      {all.length === 0 ? (
        <p className="muted">No orders yet. Place one from <Link to={`/r/${r.slug}`}>your storefront</Link> and it shows up here.</p>
      ) : (
        <div className="table">
          {all.map((o) => (
            <div key={o.id} className="table-row">
              <div>
                <strong>#{o.id}</strong> · {o.customer} {o.real && <span className="badge">from your test order</span>}
                <p className="small muted">{o.items}</p>
                <p className="small muted">{o.mode === 'delivery' ? '🛵 Delivery' : '🥡 Pickup'} · {o.minsAgo} min ago</p>
              </div>
              <div className="right">
                <strong>{formatINR(o.total)}</strong>
                <p><span className={`status s-${o.status}`}>{STATUS_LABEL[o.status]}</span></p>
                {NEXT[o.status] && (
                  <button className="btn btn-primary small" onClick={() => advance(o)}>
                    {o.status === 'placed' ? 'Accept' : 'Next step →'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

function MenuManager({ r }) {
  const [menu, setMenu] = useState(() =>
    r.menu.map((c) => ({ ...c, items: c.items.map((i) => ({ ...i, available: true })) }))
  )
  const update = (id, patch) =>
    setMenu((m) => m.map((c) => ({ ...c, items: c.items.map((i) => (i.id === id ? { ...i, ...patch } : i)) })))

  return (
    <>
      <p className="muted small">
        Change prices or mark items sold out. No approval queue, no "platform pricing rules": it's your menu.
        (Demo: changes are not saved.)
      </p>
      <div className="idea-box">
        💡 <strong>Idea:</strong> snap a photo of your paper menu and AI turns it into this list in a minute.
      </div>
      {menu.map((c) => (
        <section key={c.category} className="menu-cat">
          <h3>{c.category}</h3>
          {c.items.map((i) => (
            <div key={i.id} className={`menu-item ${i.available ? '' : 'soldout'}`}>
              <div><strong>{i.name}</strong>{!i.available && <span className="badge badge-red">Sold out</span>}</div>
              <div className="row gap-s">
                ₹<input className="input price" type="number" value={i.price} onChange={(e) => update(i.id, { price: Number(e.target.value) })} />
                <label className="switch">
                  <input type="checkbox" checked={i.available} onChange={(e) => update(i.id, { available: e.target.checked })} />
                  <span>{i.available ? 'Available' : 'Off'}</span>
                </label>
              </div>
            </div>
          ))}
        </section>
      ))}
    </>
  )
}

function Customers({ r }) {
  const [sent, setSent] = useState(null)
  return (
    <>
      <p className="muted small">
        On aggregator apps you never see who your customers are. Here, every direct order builds <em>your</em> customer list.
      </p>
      <div className="table">
        {customers.map((c) => (
          <div key={c.name} className="table-row">
            <div>
              <strong>{c.name}</strong>
              <p className="small muted">{c.orders} orders · last {c.lastOrder} · loves {c.fav}</p>
            </div>
            <div className="right">
              <strong>{formatINR(c.spend)}</strong>
              <p className="small muted">lifetime</p>
            </div>
          </div>
        ))}
      </div>
      <div className="card">
        <h3>Win back quiet regulars</h3>
        <p className="small">2 customers haven't ordered in 3+ weeks. Send them a WhatsApp offer?</p>
        <button className="btn btn-primary" onClick={() => setSent(`"Hi! We miss you at ${r.name}. Here's 10% off your next direct order this week 🙏"`)}>
          Preview WhatsApp message
        </button>
        {sent && <p className="bubble">{sent}</p>}
      </div>
    </>
  )
}

function Earnings() {
  const [orders, setOrders] = useState(1200)
  const [aov, setAov] = useState(450)
  const m = monthlyComparison(orders, aov)
  return (
    <div className="earnings">
      <div className="card">
        <h3>What could you save?</h3>
        <label>Orders per month: <strong>{orders}</strong>
          <input type="range" min="100" max="5000" step="50" value={orders} onChange={(e) => setOrders(+e.target.value)} />
        </label>
        <label>Average order value: <strong>{formatINR(aov)}</strong>
          <input type="range" min="150" max="1500" step="10" value={aov} onChange={(e) => setAov(+e.target.value)} />
        </label>
        <div className="cart-line"><span>Monthly online sales</span><span>{formatINR(m.gross)}</span></div>
        <div className="cart-line"><span>Aggregator commission ({AGGREGATOR.commission * 100}%)</span><span className="red">{formatINR(m.commissionPaid)}</span></div>
        <div className="cart-line"><span>DirectDish (flat {formatINR(DIRECT.monthlySubscription)} + ~{DIRECT.paymentGatewayPct * 100}% card gateway)</span><span>{formatINR(m.directCost)}</span></div>
        <div className="savings-saved big">≈ {formatINR(m.saved)} more in your pocket every month</div>
        <p className="small muted">Even moving 30% of orders direct saves ≈ {formatINR(m.saved * 0.3)}/month. Assumptions live in <code>src/lib/pricing.js</code>.</p>
      </div>
    </div>
  )
}

function Setup({ r }) {
  const checklist = [
    ['Basic info: name, address, hours, phone', true],
    ['Menu uploaded (typed, or photo of paper menu → AI import)', true],
    ['Real photos of the place and the food (owner shoots on phone, or we send a photographer)', true],
    ['Owner story: why this place exists', true],
    ['UPI ID linked for direct payments', true],
    ['Delivery: own rider / partner at cost / pickup only', r.offersDelivery],
    ['QR kit printed: table tents, bill footer, bag stickers', false],
    ['Google Business Profile "Order online" link pointed to storefront', false],
  ]
  return (
    <div className="setup">
      <div className="card">
        <h3>Onboarding checklist</h3>
        <ul className="checklist">
          {checklist.map(([t, done]) => <li key={t} className={done ? 'done' : ''}>{done ? '✅' : '⬜'} {t}</li>)}
        </ul>
      </div>
      <div className="card">
        <h3>Branding</h3>
        <p className="small">Each storefront uses the restaurant's own colour, photos and voice, so it feels like their place, not a template.</p>
        <div className="row gap-s"><span className="swatch" style={{ background: r.themeColor }} /> Theme colour <code>{r.themeColor}</code></div>
        <p className="small">Web address: <code>{r.slug}.directdish.in</code> (or your own domain on Pro)</p>
      </div>
    </div>
  )
}

function Plans() {
  return (
    <div className="plans">
      {plans.map((p) => (
        <div key={p.name} className={`plan ${p.highlight ? 'highlight' : ''}`}>
          <h3>{p.name}</h3>
          <p className="price">{p.price ? formatINR(p.price) : 'Free'} <span className="small muted">{p.period}</span></p>
          <ul>{p.features.map((f) => <li key={f}>✓ {f}</li>)}</ul>
          <p className="small muted">0% commission on every plan</p>
        </div>
      ))}
    </div>
  )
}
