// Mock data for the restaurant-owner dashboard.

export const sampleOrders = [
  { id: 'DDX1A2', customer: 'Priya M.', items: '2 × Dal Makhani, 4 × Butter Naan', total: 800, mode: 'delivery', status: 'preparing', minsAgo: 6 },
  { id: 'DDX1A3', customer: 'Karan S.', items: '1 × Butter Chicken, 1 × Jeera Rice', total: 550, mode: 'pickup', status: 'placed', minsAgo: 1 },
  { id: 'DDX1A4', customer: 'Fatima K.', items: '1 × Paneer Tikka, 2 × Garlic Naan', total: 400, mode: 'delivery', status: 'out_for_delivery', minsAgo: 22 },
]

export const customers = [
  { name: 'Priya M.', orders: 14, lastOrder: '2 days ago', spend: 9800, fav: 'Dal Makhani' },
  { name: 'Karan S.', orders: 9, lastOrder: 'Today', spend: 6100, fav: 'Butter Chicken' },
  { name: 'Fatima K.', orders: 7, lastOrder: 'Today', spend: 3900, fav: 'Paneer Tikka' },
  { name: 'Aditya R.', orders: 4, lastOrder: '3 weeks ago', spend: 2200, fav: 'Mutton Rogan Josh' },
  { name: 'Neha J.', orders: 3, lastOrder: '5 weeks ago', spend: 1500, fav: 'Phirni' },
]

export const plans = [
  {
    name: 'Starter',
    price: 0,
    period: 'free forever',
    features: ['Storefront page on directdish.in', 'Pickup orders', 'UPI direct to your account', 'Up to 100 orders / month'],
  },
  {
    name: 'Growth',
    price: 1499,
    period: '/ month',
    highlight: true,
    features: ['Everything in Starter', 'Unlimited orders', 'Delivery (own riders or partner at cost)', 'Customer list + WhatsApp offers', 'Loyalty rewards', 'QR table-tents & bag stickers kit'],
  },
  {
    name: 'Pro',
    price: 3999,
    period: '/ month',
    features: ['Everything in Growth', 'Your own domain (yourname.in)', 'Done-for-you photo shoot & menu setup', 'Multiple outlets', 'POS / printer integration'],
  },
]
