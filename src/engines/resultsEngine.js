export function generateFlags(answers, category, serviceId) {
  const flags = []

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
    flags.push({ level: 'high', message: 'Vague brief — complete a discovery workshop before confirming the final scope', category: 'Scope' })
  } else if (brief === 'partial') {
    flags.push({ level: 'medium', message: 'Brief has gaps — schedule a scoping call to close ambiguities before starting', category: 'Scope' })
  }

  // Budget / price acceptance
  if (answers.budget_status === 'none') {
    flags.push({ level: 'high', message: 'Package price not yet discussed — confirm acceptance before investing time in a proposal', category: 'Commercial' })
  } else if (answers.budget_status === 'tight') {
    flags.push({ level: 'high', message: 'Client is hesitant on price — address objections now; do not discount without reducing scope', category: 'Commercial' })
  }

  // Revisions
  if (answers.revision_rounds === '5+') {
    flags.push({ level: 'high', message: 'Open-ended revisions expected — cap revision rounds explicitly in the contract', category: 'Commercial' })
  } else if (answers.revision_rounds === '3-4') {
    flags.push({ level: 'medium', message: '3–4 revision rounds expected — define what counts as a revision vs a new direction', category: 'Commercial' })
  }

  // Client experience
  if (answers.client_experience === 'new') {
    flags.push({ level: 'medium', message: 'Client is new to design — build in time for education and expectation-setting at each stage', category: 'Client' })
  }

  // Scope fit (branding)
  if (answers.scope_fit === 'stretching') {
    flags.push({ level: 'high', message: "Brief feels bigger than the selected package — consider upgrading to the next tier or scoping an add-on", category: 'Scope' })
  } else if (answers.scope_fit === 'mostly') {
    flags.push({ level: 'medium', message: 'Minor scope extras may arise — log and track any additions; charge at day rate if they exceed the package', category: 'Scope' })
  }

  // Category: Branding
  if (category === 'branding') {
    if (answers.strategy_workshops === 'none' && brief && brief !== 'clear') {
      flags.push({ level: 'medium', message: 'No discovery workshop with an unclear brief — higher misalignment risk; recommend a strategy session first', category: 'Scope' })
    }
    if (serviceId === 'brand-starter-kit' && answers.competitor_research === 'deep') {
      flags.push({ level: 'medium', message: 'Deep competitor research is beyond Brand Starter Kit scope — quote separately or upgrade to Brand Essentials', category: 'Scope' })
    }
  }

  // Category: Web
  if (category === 'web') {
    if (answers.copywriting === 'client') {
      flags.push({ level: 'medium', message: "Client-supplied copy — agree a copy deadline and include a late-copy clause to protect the timeline", category: 'Scope' })
    }
    if (answers.custom_functionality === 'heavy') {
      flags.push({ level: 'high', message: 'Heavy custom functionality — ensure technical requirements are fully scoped before confirming the price', category: 'Scope' })
    }
    if (answers.integrations === 'many') {
      flags.push({ level: 'medium', message: 'Multiple integrations — document each API dependency; third-party delays can stall launch', category: 'Scope' })
    }
    if (answers.seo === 'migration') {
      flags.push({ level: 'high', message: 'SEO migration in scope — capture existing rankings and traffic data before any structural changes', category: 'Scope' })
    }
    if (answers.scope_size === 'enterprise' && serviceId !== 'full-website') {
      flags.push({ level: 'high', message: 'Enterprise-scale scope — this project should be quoted as a Full Website Build', category: 'Scope' })
    }
  }

  // Category: Social
  if (category === 'social') {
    if (answers.commitment_agreed === 'no') {
      flags.push({ level: 'critical', message: 'Minimum 3-month commitment not discussed — do not begin work without written agreement', category: 'Commercial' })
    } else if (answers.commitment_agreed === 'pending') {
      flags.push({ level: 'high', message: '3-month commitment not yet confirmed — secure written agreement before issuing the proposal', category: 'Commercial' })
    }
    if (answers.strategy_depth === 'none') {
      flags.push({ level: 'high', message: 'No strategy phase — execution without strategy creates content drift risk; recommend strategy session first', category: 'Scope' })
    }
    if (answers.brand_guidelines === 'no') {
      flags.push({ level: 'high', message: 'No brand guidelines — social content will lack consistency; brand identity work should precede this retainer', category: 'Scope' })
    }
    if (answers.paid_ads === 'full') {
      flags.push({ level: 'medium', message: 'Full paid ads in scope — media spend must be client-managed; clearly separate creative fees from ad budget in the contract', category: 'Commercial' })
    }
    if (answers.platforms === '4+') {
      flags.push({ level: 'medium', message: '4+ platforms is beyond the standard 3-platform management included — additional platform management is +£250/platform/mo', category: 'Commercial' })
    }
    if (answers.client_history === 'no') {
      flags.push({ level: 'medium', message: 'First-time agency client — schedule an onboarding call to walk through the workflow, approval process, and content calendar', category: 'Client' })
    }
  }

  const order = { critical: 0, high: 1, medium: 2, low: 3 }
  return flags.sort((a, b) => order[a.level] - order[b.level])
}

export function generateMarginWarnings(answers, service) {
  const warnings = []

  if (answers.budget_status === 'tight') {
    warnings.push('Client is hesitant on price — do not discount without formally reducing package scope in writing')
  }
  if (answers.revision_rounds === '5+') {
    warnings.push('Open-ended revisions are a margin risk — cap at 3 rounds in the contract; additional rounds billed at £750/day')
  }
  if (answers.scope_fit === 'stretching') {
    warnings.push(`Package price may not cover the full scope — log all extras and charge at £750/day for anything beyond the ${service.label} deliverables`)
  }
  if (answers.paid_ads === 'full' || answers.paid_ads === 'some') {
    warnings.push('Ad spend must remain with the client — never absorb media budget into the management fee')
  }
  if (service.monthly && answers.commitment_agreed !== 'agreed') {
    warnings.push('Do not begin production work until the 3-month retainer agreement is signed and the first invoice is paid')
  }

  return warnings
}

export function calculateClientFit(answers) {
  let score = 10

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
  if (answers.scope_fit === 'stretching') score -= 1.5
  else if (answers.scope_fit === 'mostly') score -= 0.5

  if (answers.commitment_agreed === 'no') score -= 2
  else if (answers.commitment_agreed === 'pending') score -= 1

  if (answers.strategy_depth === 'none') score -= 0.5
  if (answers.brand_guidelines === 'no') score -= 0.5
  if (answers.client_history === 'no') score -= 0.5

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
    if (serviceId === 'brand-starter-kit') {
      upsells.push({ label: 'Brand Essentials', value: '£3,000', description: 'Add strategy workshop, positioning, and a full visual identity system' })
    }
    if (serviceId === 'brand-essentials') {
      upsells.push({ label: 'Brand Playbook', value: '£6,000', description: 'Upgrade to full competitive insight, messaging framework, and comprehensive brand docs' })
    }
    if (answers.competitor_research === 'none' || answers.competitor_research === 'basic') {
      upsells.push({ label: 'Competitive Landscape Research', value: 'quote', description: 'Deep audit of 5+ competitor brands with strategic positioning insights' })
    }
    if (answers.strategy_workshops === 'none') {
      upsells.push({ label: 'Strategy Workshop', value: 'included in Brand Essentials+', description: 'Half-day brand positioning and values session to anchor creative direction' })
    }
    upsells.push({ label: 'Website Strategy Phase', value: '£1,500', description: 'Launch the new brand with strategic web planning — discovery, sitemap, wireframes' })
    upsells.push({ label: 'Essential Social Package', value: '£1,250/mo', description: 'Extend the brand into social with 6 monthly deliverables from £1,250/mo' })
  }

  if (category === 'web') {
    if (serviceId === 'strategy-phase') {
      upsells.push({ label: 'UI Design', value: 'from £1,500', description: 'Move straight into design — homepage from £1,500, additional pages from £750 each' })
      upsells.push({ label: 'Full Website Build', value: 'from £8,000', description: 'Strategy + design + development as a complete package' })
    }
    if (serviceId === 'ui-design') {
      upsells.push({ label: 'Website Strategy Phase', value: '£1,500', description: 'Add a strategy phase — discovery, sitemap, and user journey mapping before design' })
      upsells.push({ label: 'Full Website Build', value: 'from £8,000', description: 'Bundle strategy, design, and development into one scoped project' })
    }
    if (answers.copywriting === 'client') {
      upsells.push({ label: 'Copywriting', value: 'quote', description: "We write the copy — removes the risk of the project stalling on the client's content" })
    }
    if (answers.design_system === 'no') {
      upsells.push({ label: 'Brand Essentials', value: '£3,000', description: 'Build the brand identity before the site — strategy, identity system, and mini brand guide' })
    }
    if (answers.seo === 'basic') {
      upsells.push({ label: 'Full SEO Strategy', value: 'quote', description: 'Keyword research, content strategy, and on-page optimisation' })
    }
    upsells.push({ label: 'Essential Social Package', value: '£1,250/mo', description: 'Give the new site a social presence to drive traffic from day one' })
  }

  if (category === 'social') {
    if (serviceId === 'essential') {
      upsells.push({ label: 'Core Package', value: '£1,750/mo', description: 'Upgrade to include a monthly ½ day content shoot for higher production quality' })
    }
    if (serviceId === 'core') {
      upsells.push({ label: 'Signature Package', value: '£2,500/mo', description: 'Upgrade to a full shoot day, premium deliverables, and platform management included' })
    }
    if (answers.platforms === '4+' || answers.platforms === '2-3') {
      upsells.push({ label: 'Platform Management Add-On', value: '+£500/mo', description: 'Scheduling, posting, caption formatting, hashtag optimisation, basic moderation (up to 3 platforms)' })
    }
    if (answers.paid_ads === 'none') {
      upsells.push({ label: 'Paid Social Management', value: 'quote', description: 'Ad strategy, creative production, and campaign management on top of your organic content' })
    }
    if (answers.brand_guidelines === 'no' || answers.brand_guidelines === 'partial') {
      upsells.push({ label: 'Brand Essentials', value: '£3,000', description: 'Build brand guidelines before the retainer starts — essential for consistent social content' })
    }
    upsells.push({ label: 'Ad Hoc Content Day', value: '+£600', description: 'Up to 3 hours of additional content production outside your regular package' })
  }

  return upsells.slice(0, 4)
}

export function generateChecklist(answers, category, service, paymentStructure, riskScore) {
  const items = [
    'Signed contract and full scope of work before any work begins',
    `Payment: ${paymentStructure.structure} — raise first invoice before kick-off call`,
  ]

  if (!service.monthly) {
    items.push('Revision rounds capped in contract (maximum 3 included in the package)')
  }

  if (service.monthly) {
    items.push(`Minimum ${service.minCommitment}-month retainer agreement signed — do not begin production until contract is countersigned`)
    items.push('First month retainer invoice raised and paid before any content work begins')
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
    items.push('Address price objection before issuing a formal proposal — do not reduce price without reducing scope')
  }

  if (answers.revision_rounds === '5+') {
    items.push('Cap revisions to 3 rounds in contract — additional rounds billed at £750/day')
  }

  if (answers.client_experience === 'new') {
    items.push('Schedule a client onboarding call to walk through the process before work begins')
  }

  if (answers.copywriting === 'client') {
    items.push("Copy deadline agreed in writing — late copy clause included to protect the project timeline")
  }

  if (category === 'web' && answers.seo === 'migration') {
    items.push('Capture existing SEO baseline (rankings, traffic) before any redirects or structural changes')
  }

  if (category === 'social') {
    if (answers.paid_ads !== 'none') {
      items.push('Ad spend budget held and managed by client — creative/management fees separated in the contract')
    }
    if (answers.brand_guidelines === 'no') {
      items.push('Recommend completing Brand Essentials before starting the retainer — document this recommendation in writing')
    }
  }

  if (answers.scope_fit === 'stretching') {
    items.push(`Log all deliverables against the ${service.label} package scope — charge extras at £750/day`)
  }

  if (riskScore >= 75) {
    items.push('Include a kill-fee clause: 25% of remaining balance if client terminates mid-project')
  }

  return items
}
