// Mock data for the MVP. In a real product this would come from an API.
// Images use Unsplash URLs so the demo looks like real places.

const img = (id, w = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`

export const restaurants = [
  {
    slug: 'spice-route',
    name: 'Spice Route Kitchen',
    tagline: 'Home-style North Indian, slow-cooked since 2009',
    cuisine: ['North Indian', 'Mughlai'],
    area: 'Koramangala, Bengaluru',
    rating: 4.6,
    reviews: 1240,
    prepTime: '25–35 min',
    priceForTwo: 600,
    themeColor: '#c2410c',
    cover: img('photo-1585937421612-70a008356fbe', 1400),
    logoEmoji: '🍛',
    story:
      'Started by the Sharma family in a 12-table room, Spice Route still grinds its own garam masala every morning. Our dal makhani simmers overnight on a coal tandoor, the way Dadi taught us.',
    gallery: [
      img('photo-1517248135467-4c7edcad34c4'),
      img('photo-1555396273-367ea4eb4db5'),
      img('photo-1601050690597-df0568f70950'),
    ],
    owner: 'Rohit Sharma',
    phone: '+91 98450 00001',
    hours: '11:30 AM – 11:00 PM',
    offersDelivery: true,
    offersPickup: true,
    deliveryRadiusKm: 5,
    deliveryFee: 30,
    loyalty: { everyNthOrder: 5, reward: 'Free dessert' },
    menu: [
      {
        category: 'Starters',
        items: [
          { id: 'sr1', name: 'Paneer Tikka', price: 260, veg: true, desc: 'Charred cottage cheese, mint chutney', bestseller: true },
          { id: 'sr2', name: 'Chicken Seekh Kebab', price: 300, veg: false, desc: 'Minced chicken, skewered in the tandoor' },
          { id: 'sr3', name: 'Hara Bhara Kebab', price: 220, veg: true, desc: 'Spinach, peas and potato patties' },
        ],
      },
      {
        category: 'Mains',
        items: [
          { id: 'sr4', name: 'Dal Makhani', price: 280, veg: true, desc: 'Overnight-simmered black lentils', bestseller: true },
          { id: 'sr5', name: 'Butter Chicken', price: 360, veg: false, desc: 'Tandoori chicken in tomato-butter gravy', bestseller: true },
          { id: 'sr6', name: 'Kadai Paneer', price: 300, veg: true, desc: 'Peppers, onions, fresh-ground spices' },
          { id: 'sr7', name: 'Mutton Rogan Josh', price: 420, veg: false, desc: 'Kashmiri chillies, slow-braised' },
        ],
      },
      {
        category: 'Breads & Rice',
        items: [
          { id: 'sr8', name: 'Butter Naan', price: 60, veg: true, desc: '' },
          { id: 'sr9', name: 'Garlic Naan', price: 70, veg: true, desc: '' },
          { id: 'sr10', name: 'Jeera Rice', price: 160, veg: true, desc: '' },
        ],
      },
      {
        category: 'Desserts',
        items: [
          { id: 'sr11', name: 'Gulab Jamun (2 pc)', price: 90, veg: true, desc: '' },
          { id: 'sr12', name: 'Phirni', price: 110, veg: true, desc: 'Rice pudding in a clay pot' },
        ],
      },
    ],
  },
  {
    slug: 'napoli-corner',
    name: 'Napoli Corner',
    tagline: 'Wood-fired Neapolitan pizza, 90 seconds at 450°C',
    cuisine: ['Pizza', 'Italian'],
    area: 'Indiranagar, Bengaluru',
    rating: 4.7,
    reviews: 860,
    prepTime: '20–30 min',
    priceForTwo: 900,
    themeColor: '#b91c1c',
    cover: img('photo-1513104890138-7c749659a591', 1400),
    logoEmoji: '🍕',
    story:
      'Our dough rests for 48 hours. Our oven was built brick by brick by a mason from Naples. We are a tiny shop of six people and every pizza leaves the oven with someone watching it.',
    gallery: [
      img('photo-1574071318508-1cdbab80d002'),
      img('photo-1565299624946-b28f40a0ae38'),
      img('photo-1590947132387-155cc02f3212'),
    ],
    owner: 'Ananya Rao',
    phone: '+91 98450 00002',
    hours: '12:00 PM – 11:30 PM',
    offersDelivery: true,
    offersPickup: true,
    deliveryRadiusKm: 4,
    deliveryFee: 40,
    loyalty: { everyNthOrder: 6, reward: 'Free Margherita' },
    menu: [
      {
        category: 'Pizza',
        items: [
          { id: 'np1', name: 'Margherita', price: 380, veg: true, desc: 'San Marzano, fior di latte, basil', bestseller: true },
          { id: 'np2', name: 'Diavola', price: 480, veg: false, desc: 'Spicy salami, chilli oil' },
          { id: 'np3', name: 'Funghi e Tartufo', price: 520, veg: true, desc: 'Mushrooms, truffle oil, parmesan', bestseller: true },
          { id: 'np4', name: 'Quattro Formaggi', price: 540, veg: true, desc: 'Four cheeses, honey drizzle' },
        ],
      },
      {
        category: 'Sides',
        items: [
          { id: 'np5', name: 'Garlic Knots', price: 180, veg: true, desc: '' },
          { id: 'np6', name: 'Caesar Salad', price: 260, veg: false, desc: 'Anchovy dressing' },
        ],
      },
      {
        category: 'Dessert & Drinks',
        items: [
          { id: 'np7', name: 'Tiramisu', price: 240, veg: true, desc: '' },
          { id: 'np8', name: 'Italian Lemonade', price: 140, veg: true, desc: '' },
        ],
      },
    ],
  },
  {
    slug: 'dosa-junction',
    name: 'Dosa Junction',
    tagline: 'Crisp dosas and filter coffee, the Malleshwaram way',
    cuisine: ['South Indian', 'Breakfast'],
    area: 'Malleshwaram, Bengaluru',
    rating: 4.5,
    reviews: 2310,
    prepTime: '15–20 min',
    priceForTwo: 300,
    themeColor: '#15803d',
    cover: img('photo-1630383249896-424e482df921', 1400),
    logoEmoji: '🥞',
    story:
      'Three generations behind the same tawa. Batter is stone-ground daily, coffee decoction is brewed every hour, and the chutney is never more than a few hours old.',
    gallery: [
      img('photo-1668236543090-82eba5ee5976'),
      img('photo-1589301760014-d929f3979dbc'),
      img('photo-1610192244261-3f33de3f55e4'),
    ],
    owner: 'K. Venkatesh',
    phone: '+91 98450 00003',
    hours: '7:00 AM – 10:00 PM',
    offersDelivery: true,
    offersPickup: true,
    deliveryRadiusKm: 3,
    deliveryFee: 20,
    loyalty: { everyNthOrder: 8, reward: 'Free filter coffee' },
    menu: [
      {
        category: 'Dosas',
        items: [
          { id: 'dj1', name: 'Masala Dosa', price: 90, veg: true, desc: 'Potato palya, red chutney', bestseller: true },
          { id: 'dj2', name: 'Benne Dosa', price: 110, veg: true, desc: 'Davangere-style with white butter', bestseller: true },
          { id: 'dj3', name: 'Rava Onion Dosa', price: 100, veg: true, desc: '' },
        ],
      },
      {
        category: 'Tiffin',
        items: [
          { id: 'dj4', name: 'Idli Vada', price: 70, veg: true, desc: '2 idli, 1 vada, sambar' },
          { id: 'dj5', name: 'Pongal', price: 80, veg: true, desc: '' },
        ],
      },
      {
        category: 'Beverages',
        items: [
          { id: 'dj6', name: 'Filter Coffee', price: 40, veg: true, desc: '', bestseller: true },
          { id: 'dj7', name: 'Badam Milk', price: 60, veg: true, desc: '' },
        ],
      },
    ],
  },
  {
    slug: 'wok-and-roll',
    name: 'Wok & Roll',
    tagline: 'Indo-Chinese street favourites, fired on high flame',
    cuisine: ['Chinese', 'Asian'],
    area: 'HSR Layout, Bengaluru',
    rating: 4.3,
    reviews: 640,
    prepTime: '20–25 min',
    priceForTwo: 500,
    themeColor: '#7c3aed',
    cover: img('photo-1563245372-f21724e3856d', 1400),
    logoEmoji: '🥡',
    story:
      'Two friends from Kolkata who missed Tangra-style chilli chicken. We started with one wok and a food cart; now we have a kitchen but the same recipes.',
    gallery: [
      img('photo-1585032226651-759b368d7246'),
      img('photo-1512058564366-18510be2db19'),
      img('photo-1526318896980-cf78c088247c'),
    ],
    owner: 'Arjun & Mei',
    phone: '+91 98450 00004',
    hours: '12:00 PM – 12:00 AM',
    offersDelivery: false,
    offersPickup: true,
    deliveryRadiusKm: 0,
    deliveryFee: 0,
    loyalty: { everyNthOrder: 5, reward: 'Free spring rolls' },
    menu: [
      {
        category: 'Starters',
        items: [
          { id: 'wr1', name: 'Chilli Chicken (Dry)', price: 280, veg: false, desc: 'Tangra-style', bestseller: true },
          { id: 'wr2', name: 'Veg Spring Rolls', price: 180, veg: true, desc: '' },
          { id: 'wr3', name: 'Crispy Corn', price: 200, veg: true, desc: '' },
        ],
      },
      {
        category: 'Noodles & Rice',
        items: [
          { id: 'wr4', name: 'Hakka Noodles', price: 220, veg: true, desc: '', bestseller: true },
          { id: 'wr5', name: 'Schezwan Fried Rice', price: 240, veg: true, desc: '' },
          { id: 'wr6', name: 'Chicken Fried Rice', price: 260, veg: false, desc: '' },
        ],
      },
    ],
  },
]

export const getRestaurant = (slug) => restaurants.find((r) => r.slug === slug)

export const allCuisines = [...new Set(restaurants.flatMap((r) => r.cuisine))].sort()
