import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Storefront from './pages/Storefront.jsx'
import Checkout from './pages/Checkout.jsx'
import OrderTracking from './pages/OrderTracking.jsx'
import Partner from './pages/Partner.jsx'
import HowItWorks from './pages/HowItWorks.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  // Restaurant storefronts get their own branded header, so hide the global one there.
  const isStorefront = pathname.startsWith('/r/')

  return (
    <div className="app">
      {!isStorefront && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/r/:slug" element={<Storefront />} />
          <Route path="/r/:slug/checkout" element={<Checkout />} />
          <Route path="/order/:id" element={<OrderTracking />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
