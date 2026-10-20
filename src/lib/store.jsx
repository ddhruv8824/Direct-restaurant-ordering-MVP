import { createContext, useContext, useEffect, useState } from 'react'

// Tiny client-side store: cart (one restaurant at a time) and placed orders.
// Persisted in localStorage so the demo survives a refresh. No backend.

const StoreContext = createContext(null)

const load = (key, fallback) => {
  try {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : fallback
  } catch {
    return fallback
  }
}
const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* ignore */
  }
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => load('dd_cart', { slug: null, items: {} }))
  const [orders, setOrders] = useState(() => load('dd_orders', []))

  useEffect(() => save('dd_cart', cart), [cart])
  useEffect(() => save('dd_orders', orders), [orders])

  const addItem = (slug, item) =>
    setCart((c) => {
      // Ordering from a new restaurant clears the old cart, like most apps.
      const base = c.slug === slug ? c : { slug, items: {} }
      const existing = base.items[item.id]
      return {
        slug,
        items: { ...base.items, [item.id]: { ...item, qty: (existing?.qty || 0) + 1 } },
      }
    })

  const removeItem = (itemId) =>
    setCart((c) => {
      const existing = c.items[itemId]
      if (!existing) return c
      const items = { ...c.items }
      if (existing.qty <= 1) delete items[itemId]
      else items[itemId] = { ...existing, qty: existing.qty - 1 }
      return { slug: Object.keys(items).length ? c.slug : null, items }
    })

  const clearCart = () => setCart({ slug: null, items: {} })

  const placeOrder = (order) => {
    const id = 'DD' + Date.now().toString(36).toUpperCase()
    const full = { ...order, id, placedAt: Date.now(), status: 'placed' }
    setOrders((o) => [full, ...o])
    clearCart()
    return id
  }

  const updateOrderStatus = (id, status) =>
    setOrders((o) => o.map((x) => (x.id === id ? { ...x, status } : x)))

  const cartItems = Object.values(cart.items)
  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0)
  const cartSubtotal = cartItems.reduce((s, i) => s + i.qty * i.price, 0)

  return (
    <StoreContext.Provider
      value={{
        cart, cartItems, cartCount, cartSubtotal,
        addItem, removeItem, clearCart,
        orders, placeOrder, updateOrderStatus,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext)
