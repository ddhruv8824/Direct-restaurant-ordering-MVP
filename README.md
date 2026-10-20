# DirectDish — order straight from the restaurant

**A zero-commission platform that connects restaurants directly to their customers.**
Every restaurant gets its own ordering website (storefront). Customers pay the real menu price with no
platform fee, and the restaurant keeps 100% of the food bill. We charge restaurants a flat monthly
software fee instead of a cut of every order.

> This repo is a **frontend-only MVP** for discussion. All data is mocked, no real orders or payments
> happen, and fee numbers are illustrative assumptions.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # static build in dist/ (deploy anywhere: Vercel, Netlify, GitHub Pages)
```

## What to click through

| Screen | URL | What it shows |
|---|---|---|
| Directory | `#/` | Search & filter restaurants, the pitch, how it works |
| Storefront | `#/r/spice-route` | A restaurant's own branded site: menu, cart, story & real photos, share link / QR, loyalty |
| Checkout | `#/r/spice-route/checkout` | Delivery vs pickup, UPI direct to restaurant, transparent bill ("where your money goes") |
| Order tracking | `#/order/<id>` | Live status (simulated), savings vs apps, loyalty nudge |
| Restaurant dashboard | `#/partner` | Live orders (your test orders appear here), menu editor, customer list + WhatsApp win-back, savings calculator, onboarding checklist, plans |
| How it works | `#/how-it-works` | Side-by-side fee comparison and the business model in plain words |

Tip: place an order on a storefront, then open **For restaurants → Live orders** to see it arrive.

## Docs (start here for the team discussion)

1. [Concept](docs/01-concept.md): the problem, the idea, who it's for
2. [Business model](docs/02-business-model.md): how we make money without commissions, unit economics
3. [Operations](docs/03-operations.md): onboarding, delivery, payments, customer acquisition, support
4. [MVP scope](docs/04-mvp-scope.md): what this demo covers, what a real v1 needs, tech plan
5. [Roadmap & open questions](docs/05-roadmap-and-open-questions.md): phases, risks, things to decide together

## Project structure

```
src/
  data/restaurants.js   mock restaurants & menus (edit to add your own)
  data/mockOps.js       mock dashboard data (orders, customers, plans)
  lib/pricing.js        all fee assumptions in one place
  lib/store.jsx         cart + orders (localStorage, no backend)
  pages/                Home, Storefront, Checkout, OrderTracking, Partner, HowItWorks
  components/           Header, Footer, RestaurantCard, SavingsCompare
docs/                   concept & planning write-ups
```

Stack: React 18 + Vite + React Router (hash routing so it works on any static host). No backend.
