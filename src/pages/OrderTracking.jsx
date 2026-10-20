import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useStore } from '../lib/store.jsx'
import { getRestaurant } from '../data/restaurants.js'
import { formatINR } from '../lib/pricing.js'

const STEPS = {
  delivery: ['placed', 'accepted', 'preparing', 'out_for_delivery', 'delivered'],
  pickup: ['placed', 'accepted', 'preparing', 'ready', 'picked_up'],
}
const LABEL = {
  placed: 'Order sent to restaurant',
  accepted: 'Restaurant accepted',
  preparing: 'Being prepared',
  out_for_delivery: 'Out for delivery',
  delivered: 'Delivered',
  ready: 'Ready for pickup',
  picked_up: 'Picked up',
}

export default function OrderTracking() {
  const { id } = useParams()
  const { orders, updateOrderStatus } = useStore()
  const order = orders.find((o) => o.id === id)

  // Simulate the restaurant moving the order along, so the demo feels alive.
  useEffect(() => {
    if (!order) return
    const steps = STEPS[order.mode]
    const idx = steps.indexOf(order.status)
    if (idx < 0 || idx >= steps.length - 1) return
    const t = setTimeout(() => updateOrderStatus(order.id, steps[idx + 1]), 4000)
    return () => clearTimeout(t)
  }, [order?.status]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!order) {
    return (
      <div className="container section center">
        <h2>Order not found</h2>
        <Link to="/" className="btn">Home</Link>
      </div>
    )
  }

  const r = getRestaurant(order.slug)
  const steps = STEPS[order.mode]
  const current = steps.indexOf(order.status)

  return (
    <div className="container section narrow">
      <p className="muted small">Order #{order.id}</p>
      <h1>Thanks, {order.customer.name.split(' ')[0]}! 🎉</h1>
      <p>
        Your order went straight to <strong>{order.restaurantName}</strong>'s kitchen. They'll message you on{' '}
        {order.customer.phone} with updates.
      </p>

      <ol className="tracker">
        {steps.map((s, i) => (
          <li key={s} className={i < current ? 'done' : i === current ? 'current' : ''}>
            <span className="dot" />
            {LABEL[s]}
          </li>
        ))}
      </ol>

      <div className="card">
        {order.items.map((i) => (
          <div key={i.id} className="cart-line"><span>{i.qty} × {i.name}</span><span>{formatINR(i.qty * i.price)}</span></div>
        ))}
        <div className="cart-line"><span>Delivery</span><span>{order.deliveryFee ? formatINR(order.deliveryFee) : 'Free'}</span></div>
        <div className="cart-line strong"><span>Total</span><span>{formatINR(order.total)}</span></div>
        <div className="savings-saved">You saved about {formatINR(order.savedVsApp)} by ordering direct</div>
      </div>

      {r && (
        <div className="card">
          <p>🎁 {r.name} loyalty: every {r.loyalty.everyNthOrder}th order gets <strong>{r.loyalty.reward}</strong>.</p>
          <p className="small muted">Because you ordered direct, the restaurant knows you're a regular and can reward you. Big apps keep that relationship to themselves.</p>
          <Link to={`/r/${r.slug}`} className="btn">Order again from {r.name}</Link>
        </div>
      )}
    </div>
  )
}
