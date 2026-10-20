import { Link } from 'react-router-dom'
import { AGGREGATOR, DIRECT, formatINR, aggregatorTotal, restaurantTakeHome } from '../lib/pricing.js'

export default function HowItWorks() {
  const basket = 800
  const app = aggregatorTotal(basket)
  const take = restaurantTakeHome(basket)
  const a = AGGREGATOR

  return (
    <div className="container section narrow">
      <h1>How DirectDish works</h1>
      <p className="lead">
        Big delivery apps sit in the middle of every order and charge both sides. DirectDish gives each
        restaurant its own ordering website and gets out of the way.
      </p>

      <h2>The same ₹{basket} order, two ways</h2>
      <div className="compare-table">
        <div className="ct-head"><span></span><span>Typical delivery app</span><span>DirectDish</span></div>
        <div><span>Menu prices</span><span>+{a.menuMarkup * 100}% markup ({formatINR(basket * (1 + a.menuMarkup))})</span><span>Real prices ({formatINR(basket)})</span></div>
        <div><span>Platform fee</span><span>{formatINR(a.platformFee)}</span><span className="green">₹0</span></div>
        <div><span>Packaging fee</span><span>{formatINR(a.packagingFee)}</span><span className="green">₹0</span></div>
        <div><span>Delivery</span><span>{formatINR(a.deliveryFee)}</span><span>Restaurant's own rate (e.g. ₹30) or free pickup</span></div>
        <div><span>GST on fees</span><span>{a.gstOnFees * 100}%</span><span className="green">—</span></div>
        <div className="strong"><span>Customer pays</span><span>≈ {formatINR(app)}</span><span>≈ {formatINR(basket + 30)}</span></div>
        <div><span>Commission from restaurant</span><span className="red">{a.commission * 100}%</span><span className="green">0%</span></div>
        <div className="strong"><span>Restaurant keeps</span><span>≈ {formatINR(take.onApp)}</span><span>≈ {formatINR(take.direct)} (card) / {formatINR(basket)} (UPI)</span></div>
      </div>
      <p className="small muted">Numbers are illustrative assumptions for discussion, not quotes from any specific app. Edit them in <code>src/lib/pricing.js</code>.</p>

      <h2>So how does DirectDish make money?</h2>
      <p>
        A flat software subscription (about {formatINR(DIRECT.monthlySubscription)}/month on the main plan), never a
        cut of orders. A busy restaurant pays the same as a quiet one, so every extra order is pure gain for them.
        Optional paid extras: photo shoots, printed QR kits, own domain, delivery coordination at cost.
        Full thinking in <code>docs/BUSINESS_MODEL.md</code>.
      </p>

      <h2>How do customers find restaurants?</h2>
      <ul>
        <li><strong>The restaurant brings them.</strong> QR codes on bills, takeaway bags and tables: "Order direct next time, save ₹100+".</li>
        <li><strong>Google & Instagram.</strong> The storefront link goes on the Google Maps listing and Instagram bio.</li>
        <li><strong>Loyalty.</strong> Direct customers get rewards the restaurant can't offer on apps.</li>
        <li><strong>This directory.</strong> A light "restaurants near you" page, but the storefront, not the directory, is the product.</li>
      </ul>

      <h2>And delivery?</h2>
      <p>
        Three options per restaurant: pickup only, the restaurant's own rider, or an on-demand delivery partner
        (Porter, Shadowfax, Borzo or ONDC logistics) booked per order and charged at cost.
      </p>

      <div className="row gap-s">
        <Link to="/" className="btn btn-primary">Try ordering</Link>
        <Link to="/partner" className="btn">See the restaurant side</Link>
      </div>
    </div>
  )
}
