# 4. MVP scope

## What this repo is

A **clickable frontend prototype** to make the idea tangible for team discussions, restaurant
conversations and early feedback. It is **not** production software.

- React + Vite, no backend. Data lives in `src/data/*.js`; cart and orders live in the browser's localStorage.
- No real payments, accounts, notifications or deliveries.
- Fee numbers in `src/lib/pricing.js` are assumptions; change them and every screen updates.

## What's in the prototype

### Customer side
- **Directory** (`#/`): search by name/dish/area, filter by cuisine and delivery/pickup, pitch & how-it-works.
- **Restaurant storefront** (`#/r/:slug`): the restaurant's own branded page.
  - Brand colour, cover photo, rating, hours, area.
  - Menu with categories, veg/non-veg marks, bestsellers, veg-only filter, add/remove quantity.
  - **Our story** tab with owner's story and real-place photo gallery (not a generic template).
  - **Info & share** tab with the restaurant's own link and a QR placeholder.
  - Loyalty reward banner ("every 5th order: free dessert").
  - Live "typical app vs direct" savings box in the cart.
- **Checkout**: delivery vs pickup, details form with validation, payment choice (UPI direct / card / cash),
  transparent bill showing ₹0 platform fees and **where your money goes**.
- **Order tracking**: simulated status updates, savings summary, loyalty nudge, "order again".

### Restaurant side (`#/partner`)
- Switch between demo restaurants.
- **Live orders**: KPIs (orders, sales, commission paid = ₹0, what apps would have taken), orders list with
  Accept / Next step. Orders you place on a storefront appear here.
- **Menu**: edit prices, mark sold out; "AI import from menu photo" idea callout.
- **Customers**: the restaurant's own customer list, WhatsApp win-back message preview.
- **Earnings**: sliders for orders/month and average order value → monthly savings vs aggregator.
- **Storefront setup**: onboarding checklist and branding.
- **Plans**: Free / Growth / Pro.

### Explainer (`#/how-it-works`)
Side-by-side fee table and the business model in plain words.

## What a real v1 needs (not built)

| Area | v1 requirement |
|---|---|
| Backend | API + database (restaurants, menus, orders, customers). e.g. Node/NestJS or Supabase/Firebase to move fast |
| Auth | OTP login for restaurant owners/staff; guest checkout + OTP for customers |
| Storefront hosting | Subdomain per restaurant (`slug.directdish.in`), custom domains on Pro, SEO (server-rendered pages, schema.org Menu/Restaurant) |
| Payments | UPI intent/QR to restaurant + gateway with split settlement (Razorpay Route / Cashfree), webhooks |
| Notifications | WhatsApp Business API for order alerts & customer updates; SMS fallback; IVR call on missed orders |
| Delivery | Integrate one logistics partner API for rider booking + live tracking |
| Restaurant app | PWA dashboard installable on phone; sound alerts; optional thermal printer |
| Admin | Internal tool for onboarding, support, refunds |
| Analytics | Orders, repeat rate, savings delivered, channel attribution (which QR/link) |

## Suggested tech plan for v1

- **Frontend**: keep React; move to **Next.js** for server-rendered, SEO-friendly storefronts and subdomain routing.
- **Backend**: Supabase (Postgres + auth + realtime) for speed, or a Node API if the team prefers.
- **Realtime orders**: Supabase realtime / websockets → dashboard updates instantly.
- **Hosting**: Vercel (frontend) + managed Postgres.
- **AI**: menu photo → structured menu; description writer; WhatsApp offer writer.

## Success metrics for a pilot

- 20 restaurants live in one neighbourhood within 6 weeks.
- ≥ 15% of each restaurant's online orders coming direct by week 8.
- Repeat rate of direct customers ≥ 40% within 30 days.
- Restaurant churn < 10% after 3 months.
- Average saving per customer order shown on receipts (target ≥ ₹100).
