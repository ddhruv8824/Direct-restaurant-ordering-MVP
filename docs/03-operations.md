# 3. How it works operationally

## 3.1 Restaurant onboarding (target: live in 1 day)

1. **Sign-up** by phone number + OTP (owner's WhatsApp number).
2. **Basic info**: name, address (pin on map), hours, phone, FSSAI number, GSTIN (if any).
3. **Menu**: type it, upload a spreadsheet, or **snap a photo of the paper menu** and AI turns it into items,
   categories, prices and veg/non-veg tags. Owner reviews and fixes.
4. **Make it look like the real place**: owner uploads 5–10 photos from their phone (or we send a photographer
   on the Pro plan), adds a short "our story", picks a colour. AI helps write descriptions.
5. **Payments**: link UPI ID / bank account. For cards we use a payment gateway with split settlement
   (e.g. Razorpay Route / Cashfree) so money settles to the restaurant, not to us.
6. **Delivery setup**: choose pickup only, own rider, or on-demand partner (see 3.3).
7. **Go live**: storefront link `name.directdish.in`, plus a **QR kit** (table tents, bill footer, bag stickers).
8. **Google & Instagram**: we add the link to their Google Business Profile ("Order online") and Instagram bio.

The fastest path to signing restaurants is **in person**: a field person visits, sets up the storefront on
the owner's phone in 30–45 minutes, and leaves the QR kit. Start in **one neighbourhood** to build density.

## 3.2 Order flow

```
Customer opens storefront (QR / link / Google)
   → adds items → chooses delivery or pickup → pays (UPI / card / cash)
   → order arrives at restaurant (WhatsApp message + dashboard + optional printer beep)
   → restaurant taps Accept → Preparing → Ready / Out for delivery
   → customer gets status updates on WhatsApp/SMS
   → after delivery: rating + loyalty stamp + "save this place" prompt
```

**Where the restaurant sees orders:** a simple web dashboard (works on any phone/tablet they already have),
plus WhatsApp notifications so nothing is missed. Later: integrate with their POS (Petpooja etc.) so orders
land in the system they already use.

**Missed order protection:** if the restaurant doesn't accept within ~3 minutes, auto-call the restaurant's
phone (IVR), then notify the customer and refund if it's still not accepted.

## 3.3 Delivery options (restaurant chooses per outlet)

| Option | How | Who pays | Good for |
|---|---|---|---|
| **Pickup** | Customer collects | Free | Cafés, bakeries, nearby offices; cheapest for everyone |
| **Own rider** | Restaurant's staff delivers | Restaurant sets fee (e.g. ₹20–40) | Places that already deliver by phone |
| **On-demand partner** | We book a rider per order through a logistics API (e.g. Porter, Shadowfax, Borzo, or ONDC logistics providers) | Actual cost passed to customer, shown transparently | Restaurants without riders |

Show the customer the real delivery cost, not a hidden fee. That transparency is part of the brand.

## 3.4 Payments & money flow

- **UPI (default):** customer pays the restaurant's UPI ID directly (dynamic QR / intent link with order
  amount). Zero fees. We confirm payment via the gateway's webhook or a payment-confirmation flow.
- **Cards/netbanking:** via a gateway with **split settlement** so funds go to the restaurant's account;
  gateway fees (~2%) passed through at cost.
- **Cash:** pay on delivery / at counter. Restaurant marks paid.
- **We never hold the restaurant's money.** Our subscription is billed separately (monthly UPI autopay).
- **Refunds:** restaurant-initiated from the dashboard; for disputes, a simple policy + support.

## 3.5 Getting customers (the hard part)

Big apps own discovery. Our strategy is to **convert the restaurant's existing customers** first:

1. **In-store & in-bag QR**: "Order direct next time and save ₹100+" on bills, table tents and every takeaway
   bag (including bags of orders that came *via the apps*: that's the key move).
2. **Google Maps "Order online" button** pointing to the storefront.
3. **Instagram bio & WhatsApp status** of the restaurant.
4. **Loyalty that only works direct**: every 5th order free dessert, birthday offers.
5. **WhatsApp win-back**: restaurant sends offers to its own customer list.
6. **Neighbourhood density**: once 30–50 restaurants in an area are live, the directory page becomes useful
   for discovery ("all 0%-fee places near you"), plus local influencers & housing-society groups.
7. **ONDC listing** (later): list storefronts on ONDC buyer apps (e.g. Paytm, Magicpin) for extra discovery at low fees.

## 3.6 Quality, trust and support

- Ratings are **per restaurant, from verified orders only**.
- Restaurant must keep FSSAI licence on file; shown on storefront.
- Clear support path: chat/WhatsApp for customers, a phone line for restaurants.
- Restaurants handle food issues (it's their customer); we handle tech/payment issues.

## 3.7 Team needed to run a pilot

| Role | Why |
|---|---|
| 1–2 engineers | Build backend, dashboard, payments, WhatsApp integration |
| 1 designer/frontend | Storefront templates that look like the real place |
| 1–2 field sales / onboarding | Visit restaurants, set them up, place QR kits |
| 1 ops / support (part-time) | Handle missed orders, refunds, restaurant questions |

## 3.8 Legal / compliance checklist (to verify with a CA/lawyer)

- Business entity, GST registration; GST on our subscription invoices.
- Food GST & TCS rules for e-commerce operators: understand whether we count as an "e-commerce operator"
  under GST (Section 9(5) puts restaurant-service GST collection on ECOs). The direct-payment model may avoid
  this, but **must be confirmed**.
- Payment aggregator rules (RBI): use a licensed gateway; don't hold funds ourselves.
- Data privacy (DPDP Act 2023): customer data belongs to the restaurant; we're the processor. Consent for
  WhatsApp marketing.
- Terms of service for restaurants and customers; FSSAI display rules.
