# 2. Business model

> All numbers are rough assumptions to make discussion concrete. Validate them with real restaurants.
> The same assumptions drive the MVP's calculators (`src/lib/pricing.js`).

## Core principle

**We never take a percentage of orders.** If we did, we'd become the thing we're replacing. Instead,
restaurants pay for software, like they pay for a POS or a phone plan. A busy restaurant pays the same
as a quiet one, so every extra direct order is pure gain for them, and our incentives stay aligned.

## Revenue streams

| Stream | How it works | Example price | Notes |
|---|---|---|---|
| **Subscription (main)** | Flat monthly fee per outlet | Free / ₹1,499 / ₹3,999 per month | See plans below |
| **Setup & content** | Photo shoot, menu digitisation, storefront design | ₹2,000–5,000 one-time | The "show the real place" service; can be waived for annual plans |
| **Print kit** | QR table tents, bill stickers, bag stickers, flyers | ₹500–1,500 per kit | Main customer-acquisition channel, so it should be near cost |
| **Own domain** | `spiceroute.in` instead of `spiceroute.directdish.in` | Included in Pro | |
| **Delivery coordination** | We book a third-party rider per order | Passed through **at cost** + small fixed tech fee (e.g. ₹5) | Optional; keep transparent |
| **Payments** | UPI is free; cards ~2% gateway | Pass through **at cost** | Don't mark up payments, that's a hidden commission |
| **Add-ons (later)** | WhatsApp marketing credits, SMS, POS/printer integration, analytics, multi-outlet, staff accounts | ₹ per use or per month | |
| **B2B supplies (later)** | Packaging, ingredients marketplace for member restaurants | Margin on supplies | Only once we have density |

### Plans (as shown in the MVP)

| | Starter | Growth | Pro |
|---|---|---|---|
| Price | **Free** | **₹1,499/mo** | **₹3,999/mo** |
| Storefront page | ✓ | ✓ | ✓ + own domain |
| Orders | Up to 100/mo, pickup | Unlimited, pickup + delivery | Unlimited |
| Customer list, WhatsApp offers, loyalty | — | ✓ | ✓ |
| QR kit | — | ✓ | ✓ |
| Photo shoot & done-for-you setup | — | — | ✓ |
| Multiple outlets, POS integration | — | — | ✓ |
| Commission | **0%** | **0%** | **0%** |

The free tier gets restaurants in the door with no risk; upgrade happens naturally when direct orders grow.

## Unit economics (illustrative)

### For a customer (₹800 dinner)

| | Typical app | DirectDish |
|---|---|---|
| Food (app menus marked up ~15%) | ₹920 | ₹800 |
| Platform + packaging + delivery fees + GST | ≈ ₹91 | ₹30 delivery (or ₹0 pickup) |
| **Total** | **≈ ₹1,010** | **≈ ₹830** |

Saving ≈ ₹180 (~18%). This is the headline we print on every QR sticker.

### For a restaurant (1,200 online orders/month, ₹450 average)

| | Typical app (25%) | DirectDish Growth |
|---|---|---|
| Gross online sales | ₹5,40,000 | ₹5,40,000 |
| Platform cost | ₹1,35,000 commission | ₹1,499 + ~₹10,800 card gateway (≈ ₹0 if mostly UPI) |
| **Kept by restaurant** | ₹4,05,000 | ≈ ₹5,27,700 |

Even if only **30% of orders move direct**, that's roughly ₹35,000+/month extra for this restaurant.
For ₹1,499/month, the pitch is a no-brainer *if* we can deliver the orders.

### For us

- Target: **₹1,499 average revenue per restaurant per month** (mix of free and paid).
- 1,000 paying restaurants ≈ ₹15 lakh MRR ≈ ₹1.8 crore ARR.
- Main costs: field sales/onboarding (people visiting restaurants), support, hosting (small), SMS/WhatsApp.
- **Customer acquisition cost (CAC)** is mostly a sales visit + QR kit. If onboarding costs ~₹3,000 and a
  restaurant pays ₹1,499/month, payback is ~2 months. Churn is the number to watch.

## Alternatives we considered (to discuss)

1. **Small fixed fee per order** (e.g. ₹5–10 per order, no %). Simple, scales with value, still far cheaper than
   25%. Risk: feels like a commission; we have an incentive to count orders.
2. **Customer membership** (like a "DirectDish Pass" with perks across restaurants). Adds a second revenue line
   but makes us an app again.
3. **Free for restaurants, monetise via ads/featured listings** in the directory. Recreates the app's
   pay-to-be-visible problem. Probably avoid.
4. **Hybrid**: free up to N orders, then flat fee. (This is basically the Starter plan.)

Recommendation: start with **flat subscription + free tier**, test option 1 with a few restaurants if
subscriptions are hard to sell to very small shops.

## Why restaurants would switch (and why they might not)

**Pull factors:** keep 20–30% more per order; own customer data; set own prices and offers; their own brand.

**Friction:** they still need discovery (apps bring *new* customers); they need delivery; they're busy and
don't want another tablet. Our answers: stay on apps for discovery, move regulars direct; plug-in delivery;
orders on WhatsApp/the same device, no extra hardware.
