# 1. Concept

## The problem

Food delivery apps (Zomato, Swiggy and similar) became the default way to order food, and they sit in
the middle of every order:

- **Restaurants pay roughly 18–30% commission** per order, plus ads to stay visible. For a business that
  runs on 10–15% margins, that often wipes out the profit on an online order.
- To survive, restaurants **raise menu prices on the apps** (often 10–20% above dine-in prices).
- **Customers pay extra fees on top**: platform fee, packaging fee, delivery fee, surge / rain / small-cart
  fees, and GST on those fees.
- **The app owns the customer.** The restaurant doesn't get the customer's number, can't reward regulars,
  and can't reach them again without paying the app.

So both sides pay more, and the relationship that actually matters (customer ↔ their favourite place)
is rented back to them.

## The idea

**DirectDish gives every restaurant its own ordering website, and charges zero commission.**

- Each restaurant gets a **storefront**: its own page/website with its menu, real photos, the owner's
  story, its colours, and its own link and QR code. It should feel like *their place*, not a generic
  template listing.
- Customers order **directly from the restaurant** at the **real menu price**. No platform fee.
- Money goes **straight to the restaurant** (UPI to their account).
- The restaurant **owns the customer relationship**: customer list, loyalty, offers on WhatsApp.
- We make money from a **flat monthly software subscription** and optional services, never from a cut
  of each order. (Details in [02-business-model.md](02-business-model.md).)

## One-line pitch

> "Shopify for restaurants in India: your own ordering website, your customers, 0% commission."

## Who it's for

**Restaurants (our paying customers)**
- Independent restaurants, cloud kitchens, cafés, bakeries, sweet shops, tiffin services.
- Especially ones with **loyal regulars and repeat orders** (neighbourhood favourites). They benefit most,
  because their customers already know them and don't need an app to *discover* them.
- Small chains (2–10 outlets) that want their own brand online.

**Customers (our users)**
- People who already have favourite places and order from them repeatedly.
- Price-sensitive orderers tired of fees.
- Office teams and families placing bigger orders (bigger orders mean bigger savings).

## What we are **not** (at least at first)

- Not a discovery app competing with Zomato on "find any restaurant". Apps are great at discovery.
  We are great at **the second order onward**: once a customer knows a place, they order direct.
- Not a delivery fleet. We plug into delivery options rather than running riders ourselves.
- Restaurants can **stay on the big apps** for discovery and use DirectDish to move repeat customers
  to a cheaper channel. That's an easy "yes" for them, not an all-or-nothing switch.

## Why now

- **UPI** makes direct payment to a small business instant and free.
- **ONDC** (India's open commerce network) is pushing open, lower-commission food ordering and
  third-party logistics, which we can plug into for discovery and delivery.
- **On-demand logistics** (Porter, Shadowfax, Borzo and others) lets a restaurant book a rider per
  order without its own fleet.
- Restaurant owners openly complain about commissions; there's appetite for alternatives.
- AI makes setup cheap: turn a photo of a paper menu into a digital menu, write descriptions, generate
  WhatsApp offers.

## Inspiration

Similar ideas exist and are a good sign the problem is real:
- Small agencies building **direct online ordering for local pizzerias** so they skip app fees, and
  websites that **show the actual place instead of a generic template** (e.g. a Copenhagen builder
  shared by Dhruv). That "real place, real photos, owner's story" angle is built into our storefront's
  *Our story* tab and the onboarding checklist.
- Direct-ordering SaaS abroad (Owner.com, ChowNow, Flipdish, Slerp) and in India (Thrive, DotPe,
  Petpooja's online ordering, restaurant-own apps). Worth studying their pricing and what made them
  stick or struggle (see open questions).

Our angle: **India-first, UPI-first, WhatsApp-first, dead simple, flat price, and a storefront that
looks like the actual restaurant.**
