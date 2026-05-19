const DAY_RATE = 750

const RUSH_MULTIPLIERS = {
  relaxed: 1.0,
  moderate: 1.1,
  urgent: 1.3,
  asap: 1.5,
}

export function calculatePricing({ complexityScore, riskScore, rushValue, minDays, maxDays }) {
  const complexityMultiplier = 1 + (complexityScore / 100) * 0.65
  const rushMultiplier = RUSH_MULTIPLIERS[rushValue] ?? 1.0

  let riskBuffer = 1.0
  if (riskScore >= 75) riskBuffer = 1.25
  else if (riskScore >= 50) riskBuffer = 1.15

  const adjMinDays = minDays * complexityMultiplier
  const adjMaxDays = maxDays * complexityMultiplier

  const minPrice = adjMinDays * DAY_RATE * rushMultiplier * riskBuffer
  const maxPrice = adjMaxDays * DAY_RATE * rushMultiplier * riskBuffer

  const recommended = Math.round((minPrice * 0.4 + maxPrice * 0.6) / 100) * 100

  const effortDays = Math.round((adjMinDays + adjMaxDays) / 2)
  const timelineWeeks = Math.ceil(effortDays / 3)

  return {
    minPrice: Math.round(minPrice / 100) * 100,
    maxPrice: Math.round(maxPrice / 100) * 100,
    recommended,
    effortDays,
    timelineWeeks,
    complexityMultiplier,
    rushMultiplier,
    riskBuffer,
  }
}

export function getPaymentStructure(riskScore) {
  if (riskScore >= 75) {
    return {
      structure: '75 / 25',
      label: '75% upfront · 25% on delivery',
      description: 'Critical risk — substantial deposit protects against scope drift and early termination.',
    }
  }
  if (riskScore >= 50) {
    return {
      structure: '60 / 40',
      label: '60% upfront · 40% on delivery',
      description: 'Elevated risk — higher deposit recommended to protect margin.',
    }
  }
  return {
    structure: '50 / 50',
    label: '50% upfront · 50% on delivery',
    description: 'Standard terms — deposit on signing, balance on delivery.',
  }
}
