import { aggregatorTotal, directTotal, formatINR } from '../lib/pricing.js'

// Side-by-side "what you'd pay on a big app vs here" box.
export default function SavingsCompare({ subtotal, deliveryFee = 0, compact = false }) {
  if (!subtotal) return null
  const app = aggregatorTotal(subtotal)
  const direct = directTotal(subtotal, { deliveryFee })
  const saved = app - direct
  return (
    <div className={`savings ${compact ? 'compact' : ''}`}>
      <div className="savings-row">
        <span>Typical delivery app</span>
        <span className="strike">{formatINR(app)}</span>
      </div>
      <div className="savings-row strong">
        <span>Ordering direct</span>
        <span>{formatINR(direct)}</span>
      </div>
      <div className="savings-saved">You save about {formatINR(saved)} on this order</div>
    </div>
  )
}
