import { useEffect, useRef, useState } from 'react'

const FLAG_COLORS = {
  critical: { bg: '#fef2f2', border: '#fca5a5', text: '#b91c1c', dot: '#ef4444' },
  high:     { bg: '#fff7ed', border: '#fdba74', text: '#c2410c', dot: '#f97316' },
  medium:   { bg: '#fefce8', border: '#fde047', text: '#a16207', dot: '#eab308' },
  low:      { bg: '#f0fdf4', border: '#86efac', text: '#15803d', dot: '#22c55e' },
}

const LEVEL_COLORS = {
  low: '#22c55e', medium: '#eab308', high: '#f97316', extreme: '#ef4444', critical: '#ef4444',
}

function fmt(n) {
  return '£' + Math.round(n).toLocaleString()
}

function ScoreBar({ label, score, level, color }) {
  const [width, setWidth] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setWidth(score) },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [score])

  return (
    <div className="score-bar-wrap" ref={ref}>
      <div className="score-bar-header">
        <span className="score-bar-label">{label}</span>
        <div className="score-bar-right">
          <span className="score-bar-level" style={{ color }}>{level}</span>
          <span className="score-bar-value">{score}<span className="score-bar-max">/100</span></span>
        </div>
      </div>
      <div className="score-bar-track">
        <div
          className="score-bar-fill"
          style={{ width: `${width}%`, background: color, transition: 'width 1s cubic-bezier(0.4,0,0.2,1)' }}
        />
      </div>
    </div>
  )
}

function FlagBadge({ flag }) {
  const c = FLAG_COLORS[flag.level] || FLAG_COLORS.low
  return (
    <div className="flag-badge" style={{ background: c.bg, borderColor: c.border }}>
      <div className="flag-dot" style={{ background: c.dot }} />
      <div className="flag-content">
        <span className="flag-level" style={{ color: c.text }}>{flag.level.toUpperCase()}</span>
        <span className="flag-category" style={{ color: c.text }}>{flag.category}</span>
        <p className="flag-message">{flag.message}</p>
      </div>
    </div>
  )
}

function buildExport({ service, category, results: r }) {
  const line = (c) => c.padEnd(42, '─')
  const priceDisplay = r.monthly
    ? `${fmt(r.recommended)} / month (min. ${r.minCommitment} months = ${fmt(r.minTotal)})`
    : r.fromPrice
      ? `from ${fmt(r.recommended)}`
      : fmt(r.recommended)

  const lines = [
    'BLINC PRICING ESTIMATE',
    '══════════════════════════════════════════',
    `Service:  ${service.label}`,
    `Category: ${category.charAt(0).toUpperCase() + category.slice(1)}`,
    `Date:     ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`,
    '',
    line('PRICE '),
    `Package price:  ${priceDisplay}`,
    `Effort:         ~${r.effortDays} days`,
    `Timeline:       ~${r.timelineWeeks} weeks`,
    '',
    line('SCORES '),
    `Complexity:       ${r.complexityScore}/100 (${r.complexityLevel})`,
    `Risk:             ${r.riskScore}/100 (${r.riskLevel})`,
    `Scope creep risk: ${r.scopeCreepRisk}`,
    '',
    line('FLAGS '),
  ]

  if (r.flags.length === 0) {
    lines.push('No issues identified')
  } else {
    r.flags.forEach(f => lines.push(`[${f.level.toUpperCase()}] ${f.category}: ${f.message}`))
  }

  if (r.marginWarnings.length > 0) {
    lines.push('')
    lines.push(line('MARGIN WARNINGS '))
    r.marginWarnings.forEach(w => lines.push(`• ${w}`))
  }

  lines.push('')
  lines.push(line('CLIENT FIT '))
  lines.push(`${r.clientFit.score}/10 — ${r.clientFit.label}`)

  lines.push('')
  lines.push(line('PAYMENT STRUCTURE '))
  lines.push(r.paymentStructure.label)
  lines.push(r.paymentStructure.description)

  if (r.upsells.length > 0) {
    lines.push('')
    lines.push(line('REVENUE OPPORTUNITIES '))
    r.upsells.forEach(u => lines.push(`• ${u.label} ${u.value} — ${u.description}`))
  }

  lines.push('')
  lines.push(line('PROPOSAL CHECKLIST '))
  r.checklist.forEach(item => lines.push(`☐ ${item}`))

  return lines.join('\n')
}

export default function ResultsDashboard({ service, category, results: r, onReset, onRestart }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    const text = buildExport({ service, category, results: r })
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const complexityColor = LEVEL_COLORS[r.complexityLevel]
  const riskColor = LEVEL_COLORS[r.riskLevel]
  const scopeColors = { low: '#22c55e', medium: '#eab308', high: '#ef4444' }
  const fitColor = r.clientFit.score >= 7 ? '#22c55e' : r.clientFit.score >= 5 ? '#eab308' : '#ef4444'

  const priceLabel = r.monthly ? '/ month' : r.fromPrice ? 'from' : null

  return (
    <div className="results-screen">
      <header className="results-header">
        <div className="header-inner">
          <button className="back-btn" onClick={onReset}>← New Quote</button>
          <div className="wizard-meta">
            <span className="wizard-service">{service.label}</span>
            <span className="header-tag">Results</span>
          </div>
        </div>
      </header>

      <main className="results-main">

        {/* Price Hero */}
        <section className="results-card results-hero">
          <div className="hero-recommended">
            {priceLabel === 'from' && <span className="hero-from-label">from</span>}
            <span className="hero-price">{fmt(r.recommended)}</span>
            {priceLabel === '/ month' && <span className="hero-suffix">/ month</span>}
          </div>

          {r.monthly && r.minTotal && (
            <div className="hero-commitment">
              Min. {r.minCommitment} months · Total commitment {fmt(r.minTotal)}
            </div>
          )}

          <div className="hero-grid hero-grid--simple">
            <div className="hero-stat">
              <span className="stat-label">Effort</span>
              <span className="stat-value">~{r.effortDays} days</span>
            </div>
            <div className="hero-divider" />
            <div className="hero-stat">
              <span className="stat-label">Timeline</span>
              <span className="stat-value">~{r.timelineWeeks} weeks</span>
            </div>
            <div className="hero-divider" />
            <div className="hero-stat">
              <span className="stat-label">Day rate</span>
              <span className="stat-value">£750</span>
            </div>
          </div>
        </section>

        {/* Scores */}
        <section className="results-card">
          <h3 className="card-title">Complexity & Risk</h3>
          <div className="scores-wrap">
            <ScoreBar label="Complexity" score={r.complexityScore} level={r.complexityLevel} color={complexityColor} />
            <ScoreBar label="Risk" score={r.riskScore} level={r.riskLevel} color={riskColor} />
          </div>
          <div className="scope-creep-wrap">
            <span className="scope-label">Scope creep risk</span>
            <span
              className="scope-badge"
              style={{
                background: scopeColors[r.scopeCreepRisk] + '18',
                color: scopeColors[r.scopeCreepRisk],
                borderColor: scopeColors[r.scopeCreepRisk] + '60',
              }}
            >
              {r.scopeCreepRisk}
            </span>
          </div>
        </section>

        {/* Client Fit */}
        <section className="results-card">
          <h3 className="card-title">Ideal Client Fit</h3>
          <div className="fit-wrap">
            <div className="fit-score-wrap">
              <span className="fit-score" style={{ color: fitColor }}>{r.clientFit.score}</span>
              <span className="fit-denom">/10</span>
            </div>
            <div className="fit-label-wrap">
              <span className="fit-label" style={{ color: fitColor }}>{r.clientFit.label}</span>
              <span className="fit-sub">
                {r.clientFit.score >= 8 ? 'Strong alignment — proceed with confidence.' :
                  r.clientFit.score >= 6 ? 'Reasonable fit — address flagged risks before signing.' :
                  r.clientFit.score >= 4 ? "Marginal fit — consider whether this aligns with Blinc's ideal client." :
                  'Poor fit — significant risks present. Proceed only with strong safeguards.'}
              </span>
            </div>
          </div>
        </section>

        {/* Flags */}
        {r.flags.length > 0 && (
          <section className="results-card">
            <h3 className="card-title">Flags & Warnings</h3>
            <div className="flags-list">
              {r.flags.map((flag, i) => <FlagBadge key={i} flag={flag} />)}
            </div>
          </section>
        )}

        {/* Margin Warnings */}
        {r.marginWarnings.length > 0 && (
          <section className="results-card results-card--margin">
            <h3 className="card-title">Margin Protection</h3>
            <ul className="margin-list">
              {r.marginWarnings.map((w, i) => (
                <li key={i} className="margin-item">
                  <span className="margin-icon">⚠</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Payment Structure */}
        <section className="results-card">
          <h3 className="card-title">Recommended Payment Structure</h3>
          <div className="payment-wrap">
            <span className="payment-structure">{r.paymentStructure.structure}</span>
            <div className="payment-detail">
              <strong>{r.paymentStructure.label}</strong>
              <p>{r.paymentStructure.description}</p>
            </div>
          </div>
        </section>

        {/* Revenue Opportunities */}
        {r.upsells.length > 0 && (
          <section className="results-card">
            <h3 className="card-title">Revenue Opportunities</h3>
            <div className="upsells-grid">
              {r.upsells.map((u, i) => (
                <div key={i} className="upsell-card">
                  <div className="upsell-top">
                    <span className="upsell-label">{u.label}</span>
                    <span className="upsell-value">{u.value}</span>
                  </div>
                  <p className="upsell-desc">{u.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Proposal Checklist */}
        <section className="results-card">
          <h3 className="card-title">Proposal Checklist</h3>
          <ul className="checklist">
            {r.checklist.map((item, i) => (
              <li key={i} className="checklist-item">
                <span className="checklist-box">☐</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Actions */}
        <div className="results-actions">
          <button className="action-btn action-btn--primary" onClick={handleCopy}>
            {copied ? '✓ Copied to clipboard' : 'Copy plain text export'}
          </button>
          <button className="action-btn" onClick={onRestart}>Re-run assessment</button>
          <button className="action-btn" onClick={onReset}>New service</button>
        </div>

      </main>
    </div>
  )
}
