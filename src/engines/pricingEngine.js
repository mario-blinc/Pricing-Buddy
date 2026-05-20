export function calculatePricing({ fixedPrice, fromPrice, monthly, minCommitment, minDays, maxDays }) {
  const effortDays = Math.round((minDays + maxDays) / 2)
  const timelineWeeks = Math.ceil(effortDays / 3)
  const minTotal = monthly && minCommitment ? fixedPrice * minCommitment : null

  return {
    recommended: fixedPrice,
    minPrice: fixedPrice,
    maxPrice: fixedPrice,
    fromPrice: fromPrice || false,
    monthly: monthly || false,
    minCommitment: minCommitment || null,
    minTotal,
    effortDays,
    timelineWeeks,
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
