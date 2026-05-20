export function calculatePricing({ fixedPrice, fromPrice, monthly, minCommitment, minDays, maxDays, addonItems, addonTotal }) {
  const totalPrice = fixedPrice + (addonTotal || 0)
  const effortDays = Math.round((minDays + maxDays) / 2)
  const timelineWeeks = Math.ceil(effortDays / 3)
  const minTotal = monthly && minCommitment ? totalPrice * minCommitment : null

  return {
    recommended: totalPrice,
    basePrice: fixedPrice,
    addonItems: addonItems || [],
    addonTotal: addonTotal || 0,
    minPrice: totalPrice,
    maxPrice: totalPrice,
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
