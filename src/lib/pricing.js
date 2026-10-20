// Illustrative fee model used across the MVP.
// Numbers are rough assumptions for discussion, not market data. Tweak them here.

export const AGGREGATOR = {
  menuMarkup: 0.15, // restaurants often list 10–20% higher on apps to absorb commission
  commission: 0.25, // commission charged to the restaurant on each order
  platformFee: 12, // flat fee charged to the customer per order
  deliveryFee: 45,
  packagingFee: 20,
  gstOnFees: 0.18,
}

export const DIRECT = {
  monthlySubscription: 1499, // what the restaurant pays us per month, flat
  paymentGatewayPct: 0.02, // passed through at cost (UPI is often 0%)
}

export const formatINR = (n) => '₹' + Math.round(n).toLocaleString('en-IN')

// Customer pays on DirectDish: menu price + restaurant's own delivery fee (or 0 for pickup).
export function directTotal(subtotal, { deliveryFee = 0 } = {}) {
  return subtotal + deliveryFee
}

// What the same basket would roughly cost on a typical aggregator app.
export function aggregatorTotal(subtotal) {
  const a = AGGREGATOR
  const marked = subtotal * (1 + a.menuMarkup)
  const fees = a.platformFee + a.deliveryFee + a.packagingFee
  return marked + fees + fees * a.gstOnFees
}

// What the restaurant keeps from one order.
export function restaurantTakeHome(subtotal) {
  const a = AGGREGATOR
  const onApp = subtotal * (1 + a.menuMarkup) * (1 - a.commission)
  const direct = subtotal * (1 - DIRECT.paymentGatewayPct)
  return { onApp, direct }
}

// Monthly view for a restaurant doing N orders at an average order value.
export function monthlyComparison(ordersPerMonth, avgOrderValue) {
  const gross = ordersPerMonth * avgOrderValue
  const commissionPaid = gross * AGGREGATOR.commission
  const directCost = DIRECT.monthlySubscription + gross * DIRECT.paymentGatewayPct
  return { gross, commissionPaid, directCost, saved: commissionPaid - directCost }
}
