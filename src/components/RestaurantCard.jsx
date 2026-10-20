import { Link } from 'react-router-dom'
import { formatINR } from '../lib/pricing.js'

export default function RestaurantCard({ r }) {
  return (
    <Link to={`/r/${r.slug}`} className="r-card">
      <div className="r-card-img" style={{ backgroundImage: `url(${r.cover})` }}>
        <span className="badge badge-green">0% fees</span>
      </div>
      <div className="r-card-body">
        <div className="row between">
          <h3>{r.logoEmoji} {r.name}</h3>
          <span className="rating">★ {r.rating}</span>
        </div>
        <p className="muted small">{r.cuisine.join(' · ')} · {r.area}</p>
        <p className="muted small">
          {r.prepTime} · {formatINR(r.priceForTwo)} for two ·{' '}
          {r.offersDelivery ? 'Delivery & pickup' : 'Pickup only'}
        </p>
      </div>
    </Link>
  )
}
