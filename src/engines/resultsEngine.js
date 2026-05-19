export function generateFlags(answers, category) {
  const flags = []

  // Timeline
  if (answers.timeline === 'asap') {
    flags.push({ level: 'critical', message: 'ASAP timeline — apply rush pricing and lock scope before starting any work', category: 'Timeline' })
  } else if (answers.timeline === 'urgent') {
    flags.push({ level: 'high', message: 'Urgent timeline — rush multiplier applied, confirm full deliverables list upfront', category: 'Timeline' })
  }

  // Decision makers / approval process
  const dm = answers.decision_makers
  const rp = answers.revision_process || answers.approval_process
  if (dm === '4+' || rp === 'unclear' || rp === 'complex') {
    flags.push({ level: 'high', message: 'Multiple stakeholders or unclear approvals — define the sign-off chain in writing before kick-off', category: 'Scope' })
  } else if (dm === '2-3' || rp === 'stakeholders' || rp === 'moderate') {
    flags.push({ level: 'medium', message: 'Multiple approvers — build alignment time into each review stage', category: 'Scope' })
  }

  // Brief clarity
  const brief = answers.brief_clarity
  if (brief === 'none') {
    flags.push({ level: 'critical', message: 'No brief provided — do not begin design without a completed, signed-off discovery brief', category: 'Scope' })
  } else if (brief === 'vague') {
    flags.push({ level: 'high', message: 'Vague brief — include a mandatory discovery workshop before quoting a final price', category: 'Scope' })
  } else if (brief === 'partial') {
    flags.push({ level: 'medium', message: 'Brief has gaps — schedule a scoping call to close ambiguities before starting', category: 'Scope' })
  }

  // Budget
  if (answers.budget_status === 'none') {
    flags.push({ level: 'high', message: 'No budget disclosed — qualify budget alignment before investing time in a full proposal', category: 'Commercial' })
  } else if (answers.budget_status === 'tight') {
    flags.push({ level: 'high', message: 'Budget feels tight — consider phased delivery or reduced scope for Phase 1', category: 'Commercial' })
  }

  // Revisions
  if (answers.revision_rounds === '5+') {
    flags.push({ level: 'high', message: 'Open-ended revisions — cap revision rounds explicitly in the contract to protect margin', category: 'Commercial' })
  } else if (answers.revision_rounds === '3-4') {
    flags.push({ level: 'medium', message: '3–4 revision rounds expected — define what constitutes a revision vs a new direction', category: 'Commercial' })
  }

  // Client experience
  if (answers.client_experience === 'new') {
    flags.push({ level: 'medium', message: 'Client is new to design — plan for extra education time and expectation-setting at each stage', category: 'Client' })
  }

  // Category-specific: Branding
  if (category === 'branding') {
    if (answers.strategy_workshops === 'none' && brief !== 'clear') {
      flags.push({ level: 'medium', message: 'No discovery workshop with an unclear brief — higher misalignment risk without structured strategy time', category: 'Scope' })
    }
    if (answers.touchpoints === 'full' && answers.timeline === 'asap') {
      flags.push({ level: 'high', message: 'Full brand system on ASAP timeline — risk of quality compromise; consider phasing guidelines delivery', category: 'Timeline' })
    }
  }

  // Category-specific: Web
  if (category === 'web') {
    if (answers.copywriting === 'client') {
      flags.push({ level: 'medium', message: "Client-supplied copy — agree a copy deadline and include a late-copy clause to protect the timeline", category: 'Scope' })
    }
    if (answers.custom_functionality === 'heavy') {
      flags.push({ level: 'high', message: 'Heavy custom functionality — ensure technical requirements are fully scoped before quoting', category: 'Scope' })
    }
    if (answers.integrations === 'many') {
      flags.push({ level: 'medium', message: 'Multiple integrations — document each API dependency; third-party delays can stall launch', category: 'Scope' })
    }
    if (answers.seo === 'migration') {
      flags.push({ level: 'high', message: 'SEO migration in scope — traffic loss risk is high; get existing performance data before starting', category: 'Scope' })
    }
  }

  // Category-specific: Social
  if (category === 'social') {
    if (answers.strategy_depth === 'none') {
      flags.push({ level: 'high', message: 'No strategy phase — execution without strategy creates dependency risk; recommend a strategy package first', category: 'Scope' })
    }
    if (answers.brand_guidelines === 'no') {
      flags.push({ level: 'high', message: 'No brand guidelines — social content will lack consistency; brand identity work should precede this', category: 'Scope' })
    }
    if (answers.paid_ads === 'full') {
      flags.push({ level: 'medium', message: 'Full paid ads in scope — ad spend should be client-managed; clearly separate creative fees from media budget', category: 'Commercial' })
    }
  }

  // Sort: critical → high → medium → low
  const order = { critical: 0, high: 1, medium: 2, low: 3 }
  return flags.sort((a, b) => order[a.level] - order[b.level])
}

export function generateMarginWarnings(pricing, answers) {
  const warnings = []

  if (answers.timeline === 'asap') {
    warnings.push('Rush surcharge (1.5×) must be itemised as a separate line in the proposal — do not absorb into base price')
  }
  if (pricing.complexityMultiplier > 1.4) {
    warnings.push('High complexity uplift applied — confirm full scope with client before signing; avoid fixed-price if scope is still unclear')
  }
  if (pricing.riskBuffer > 1) {
    const pct = Math.round((pricing.riskBuffer - 1) * 100)
    warnings.push(`Risk buffer of ${pct}% applied — review kill-fee clause in contract before signing`)
  }
  if (answers.budget_status === 'tight' && pricing.riskBuffer > 1) {
    warnings.push('Tight budget combined with elevated risk — price this project at the recommended minimum or walk away')
  }

  return warnings
}

export function calculateClientFit(answers) {
  let score = 10

  if (answers.timeline === 'asap') score -= 2
  else if (answers.timeline === 'urgent') score -= 1

  const dm = answers.decision_makers
  const rp = answers.revision_process || answers.approval_process
  if (dm === '4+' || rp === 'unclear' || rp === 'complex') score -= 2
  else if (dm === '2-3' || rp === 'stakeholders' || rp === 'moderate') score -= 1

  const brief = answers.brief_clarity
  if (brief === 'none') score -= 2
  else if (brief === 'vague') score -= 1

  if (answers.budget_status === 'tight') score -= 1.5
  else if (answers.budget_status === 'none') score -= 2

  if (answers.revision_rounds === '5+') score -= 1
  if (answers.client_experience === 'new') score -= 0.5
  if (answers.strategy_depth === 'none') score -= 0.5
  if (answers.brand_guidelines === 'no') score -= 0.5

  score = Math.max(1, Math.min(10, Math.round(score)))

  let label
  if (score >= 9) label = 'Ideal fit'
  else if (score >= 7) label = 'Good fit'
  else if (score >= 5) label = 'Proceed with care'
  else if (score >= 3) label = 'High-risk client'
  else label = 'Not recommended'

  return { score, label }
}

export function generateUpsells(answers, category, serviceId) {
  const upsells = []

  if (category === 'branding') {
    if (answers.touchpoints === 'logo') {
      upsells.push({ label: 'Brand Core Set', value: '+£1,200', description: 'Expand to full colour palette, type system, and usage guidelines' })
    }
    if (answers.competitor_research === 'none') {
      upsells.push({ label: 'Competitor Landscape Audit', value: '+£900', description: 'Desktop review of 5 competitor brands with strategic insights' })
    }
    if (answers.strategy_workshops === 'none') {
      upsells.push({ label: 'Brand Discovery Workshop', value: '+£1,500', description: 'Half-day positioning and values session to anchor the creative direction' })
    }
    upsells.push({ label: 'Marketing Site', value: 'from £6,750', description: 'Launch the new brand with a site that matches the identity' })
    upsells.push({ label: 'Social Media Templates', value: 'from £3,750', description: 'Extend the brand into a ready-made social template system' })
  }

  if (category === 'web') {
    if (answers.copywriting === 'client') {
      upsells.push({ label: 'Copywriting Support', value: '+£1,200', description: 'Professional copy for key pages — homepage, about, and services' })
    }
    if (answers.seo === 'basic') {
      upsells.push({ label: 'Full SEO Strategy', value: '+£2,000', description: 'Keyword research, content strategy, and on-page optimisation audit' })
    }
    if (answers.design_system === 'no') {
      upsells.push({ label: 'Brand Identity', value: 'from £3,750', description: 'Create a brand identity before building the site for better results' })
    }
    if (answers.cms === 'none') {
      upsells.push({ label: 'CMS Integration', value: '+£1,500', description: 'Add content management so the client can update copy independently' })
    }
    upsells.push({ label: 'Social Media Templates', value: 'from £3,750', description: 'Launch with a ready-made social presence that matches the site' })
  }

  if (category === 'social') {
    if (answers.strategy_depth === 'none') {
      upsells.push({ label: 'Social Strategy Package', value: '+£2,250', description: 'Audit, audience personas, content pillars, and a 3-month KPI framework' })
    }
    if (answers.paid_ads === 'none') {
      upsells.push({ label: 'Paid Social Management', value: '+£1,800/mo', description: 'Ad strategy, creative production, and campaign management' })
    }
    if (answers.reporting === 'none') {
      upsells.push({ label: 'Monthly Analytics Report', value: '+£600/mo', description: 'Performance report with insights and recommendations each month' })
    }
    if (answers.brand_guidelines === 'no') {
      upsells.push({ label: 'Brand Identity', value: 'from £3,750', description: 'Establish brand guidelines before social content for consistency' })
    }
    upsells.push({ label: 'Marketing Site', value: 'from £6,750', description: 'Give social traffic a high-converting place to land' })
  }

  return upsells.slice(0, 4)
}

export function generateChecklist(answers, category, paymentStructure, riskScore) {
  const items = [
    'Signed contract and full scope of work before any work begins',
    `Payment: ${paymentStructure.structure} — raise first invoice before kick-off call`,
    'Revision rounds capped in contract (recommended: 3 maximum)',
  ]

  if (answers.timeline === 'asap' || answers.timeline === 'urgent') {
    items.push('Rush surcharge documented as a separate line item — not absorbed into base price')
  }

  const dm = answers.decision_makers
  const rp = answers.revision_process || answers.approval_process
  if (dm === '4+' || rp === 'unclear' || rp === 'complex') {
    items.push('All stakeholders and full approval chain documented in writing before kick-off')
  }

  const brief = answers.brief_clarity
  if (brief === 'none' || brief === 'vague') {
    items.push('Discovery/briefing phase required — do not begin design until brief is complete and signed off')
  }

  if (answers.budget_status === 'tight') {
    items.push('Scope Phase 1 only in this proposal — quote Phase 2 separately after delivery')
  }

  if (answers.revision_rounds === '5+') {
    items.push('Cap revisions to 3 rounds — include an additional-round day rate in the contract')
  }

  if (answers.client_experience === 'new') {
    items.push('Schedule a client onboarding call to walk through the process before work begins')
  }

  if (answers.copywriting === 'client') {
    items.push("Copy deadline agreed in writing — late copy clause to protect project timeline")
  }

  if (category === 'web' && answers.seo === 'migration') {
    items.push('Capture existing SEO baseline data (rankings, traffic) before any redirects or structural changes')
  }

  if (category === 'social' && answers.paid_ads !== 'none') {
    items.push('Media spend separated from creative/management fees — ad budget held by client')
  }

  if (riskScore >= 75) {
    items.push('Include a kill-fee clause: 25% of remaining balance if client terminates mid-project')
  }

  return items
}
