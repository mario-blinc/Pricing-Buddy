import { useState } from 'react'
import { CATEGORIES, SERVICES } from '../data/services'

export default function ServiceSelector({ onSelect }) {
  const [activeCategory, setActiveCategory] = useState(null)

  const services = activeCategory ? SERVICES[activeCategory] : []

  function handleCategoryClick(cat) {
    setActiveCategory(cat === activeCategory ? null : cat)
  }

  function handleServiceClick(service) {
    onSelect(activeCategory, service)
  }

  return (
    <div className="selector-screen">
      <header className="selector-header">
        <div className="header-inner">
          <span className="logo">Blinc</span>
          <span className="header-tag">Pricing Intelligence</span>
        </div>
      </header>

      <main className="selector-main">
        <div className="selector-hero">
          <h1 className="selector-title">What are we quoting?</h1>
          <p className="selector-subtitle">Select a service category to begin the assessment</p>
        </div>

        <div className="category-grid">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`category-card ${activeCategory === cat.id ? 'category-card--active' : ''}`}
              onClick={() => handleCategoryClick(cat.id)}
            >
              <span className="category-icon">{cat.icon}</span>
              <span className="category-label">{cat.label}</span>
              <span className="category-desc">{cat.description}</span>
              <span className="category-arrow">{activeCategory === cat.id ? '↑' : '↓'}</span>
            </button>
          ))}
        </div>

        {activeCategory && (
          <div className="service-list" key={activeCategory}>
            <p className="service-list-label">Choose a service type</p>
            <div className="service-grid">
              {services.map(service => (
                <button
                  key={service.id}
                  className="service-card"
                  onClick={() => handleServiceClick(service)}
                >
                  <span className="service-name">{service.label}</span>
                  <span className="service-meta">
                    {service.minDays}–{service.maxDays} days base
                  </span>
                  <span className="service-range">
                    from £{(service.minDays * 750).toLocaleString()}
                  </span>
                  <span className="service-arrow">Start assessment →</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="selector-footer">
        <span>Day rate £750 · 3 working days/week · Internal use only</span>
      </footer>
    </div>
  )
}
