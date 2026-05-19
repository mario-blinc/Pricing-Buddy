export const BRANDING_QUESTIONS = [
  {
    id: 'timeline',
    question: "What is the client's timeline expectation?",
    hint: 'Affects rush pricing multiplier',
    options: [
      { label: 'Relaxed — no hard deadline', value: 'relaxed', complexityPoints: 0, riskPoints: 0, rush: 'relaxed' },
      { label: 'Moderate — 6–8 weeks', value: 'moderate', complexityPoints: 5, riskPoints: 5, rush: 'moderate' },
      { label: 'Urgent — 3–4 weeks', value: 'urgent', complexityPoints: 15, riskPoints: 20, rush: 'urgent' },
      { label: 'ASAP — under 2 weeks', value: 'asap', complexityPoints: 25, riskPoints: 35, rush: 'asap' },
    ],
  },
  {
    id: 'existing_brand',
    question: 'Does the client have an existing brand to reference or evolve from?',
    options: [
      { label: 'Starting from scratch — no brand at all', value: 'none', complexityPoints: 10, riskPoints: 10 },
      { label: 'Outdated brand — significant rework needed', value: 'outdated', complexityPoints: 15, riskPoints: 15 },
      { label: 'Strong existing brand — evolution only', value: 'strong', complexityPoints: 5, riskPoints: 5 },
    ],
  },
  {
    id: 'decision_makers',
    question: 'How many decision makers are involved in approvals?',
    hint: 'More stakeholders increases scope creep risk',
    options: [
      { label: 'One — clear single point of contact', value: '1', complexityPoints: 0, riskPoints: 0 },
      { label: '2–3 — small team', value: '2-3', complexityPoints: 10, riskPoints: 15 },
      { label: '4 or more — committee approvals', value: '4+', complexityPoints: 20, riskPoints: 30 },
    ],
  },
  {
    id: 'brief_clarity',
    question: "How clear and complete is the client's brief?",
    options: [
      { label: 'Very clear — detailed brief provided', value: 'clear', complexityPoints: 0, riskPoints: 0 },
      { label: 'Partial — some gaps to explore', value: 'partial', complexityPoints: 10, riskPoints: 10 },
      { label: 'Vague — big picture only', value: 'vague', complexityPoints: 20, riskPoints: 25 },
      { label: 'None — starting from absolute zero', value: 'none', complexityPoints: 30, riskPoints: 35 },
    ],
  },
  {
    id: 'revision_rounds',
    question: 'How many revision rounds are expected or agreed?',
    options: [
      { label: '2 rounds — tight and focused', value: '2', complexityPoints: 0, riskPoints: 0 },
      { label: '3–4 rounds — standard process', value: '3-4', complexityPoints: 10, riskPoints: 10 },
      { label: '5+ rounds — open-ended', value: '5+', complexityPoints: 25, riskPoints: 30 },
    ],
  },
  {
    id: 'touchpoints',
    question: 'What brand touchpoints are required?',
    options: [
      { label: 'Logo only — mark and wordmark', value: 'logo', complexityPoints: 0, riskPoints: 0 },
      { label: 'Core set — logo, colour, type, usage', value: 'core', complexityPoints: 10, riskPoints: 5 },
      { label: 'Full system — complete brand guidelines', value: 'full', complexityPoints: 25, riskPoints: 10 },
    ],
  },
  {
    id: 'competitor_research',
    question: 'Is competitor and market research required?',
    options: [
      { label: 'None — client provides their own context', value: 'none', complexityPoints: 0, riskPoints: 5 },
      { label: 'Basic — desktop review of 3–5 competitors', value: 'basic', complexityPoints: 5, riskPoints: 0 },
      { label: 'Deep — full landscape audit and report', value: 'deep', complexityPoints: 15, riskPoints: 0 },
    ],
  },
  {
    id: 'strategy_workshops',
    question: 'Are strategy or discovery workshops required?',
    options: [
      { label: 'None — jump straight into design', value: 'none', complexityPoints: 0, riskPoints: 15 },
      { label: 'One — positioning or values session', value: '1', complexityPoints: 5, riskPoints: 5 },
      { label: 'Multiple — full discovery programme', value: 'multiple', complexityPoints: 15, riskPoints: 0 },
    ],
  },
  {
    id: 'client_experience',
    question: 'How experienced is the client with design processes?',
    options: [
      { label: 'Design-savvy — knows the drill', value: 'savvy', complexityPoints: 0, riskPoints: 0 },
      { label: 'Moderate — some past experience', value: 'moderate', complexityPoints: 5, riskPoints: 10 },
      { label: 'New to it — needs hand-holding', value: 'new', complexityPoints: 10, riskPoints: 20 },
    ],
  },
  {
    id: 'budget_status',
    question: 'Has the client disclosed or indicated a budget?',
    options: [
      { label: 'Yes — aligns well with our rates', value: 'aligned', complexityPoints: 0, riskPoints: 0 },
      { label: 'Yes — feels tight or below market', value: 'tight', complexityPoints: 0, riskPoints: 20 },
      { label: 'No budget mentioned yet', value: 'none', complexityPoints: 0, riskPoints: 25 },
    ],
  },
]

export const WEB_QUESTIONS = [
  {
    id: 'timeline',
    question: "What is the client's timeline expectation?",
    hint: 'Affects rush pricing multiplier',
    options: [
      { label: 'Relaxed — no hard deadline', value: 'relaxed', complexityPoints: 0, riskPoints: 0, rush: 'relaxed' },
      { label: 'Moderate — 8–12 weeks', value: 'moderate', complexityPoints: 5, riskPoints: 5, rush: 'moderate' },
      { label: 'Urgent — 4–6 weeks', value: 'urgent', complexityPoints: 15, riskPoints: 20, rush: 'urgent' },
      { label: 'ASAP — under 3 weeks', value: 'asap', complexityPoints: 25, riskPoints: 35, rush: 'asap' },
    ],
  },
  {
    id: 'scope_size',
    question: 'What is the scope and scale of the site?',
    options: [
      { label: 'Small — 1–5 pages', value: 'small', complexityPoints: 0, riskPoints: 0 },
      { label: 'Medium — 6–15 pages', value: 'medium', complexityPoints: 10, riskPoints: 5 },
      { label: 'Large — 16–30 pages', value: 'large', complexityPoints: 25, riskPoints: 10 },
      { label: 'Enterprise — 30+ pages or sections', value: 'enterprise', complexityPoints: 40, riskPoints: 20 },
    ],
  },
  {
    id: 'cms',
    question: 'Is a CMS (content management system) required?',
    options: [
      { label: 'None — static site', value: 'none', complexityPoints: 0, riskPoints: 0 },
      { label: 'Basic — simple editing (Webflow, Squarespace)', value: 'basic', complexityPoints: 5, riskPoints: 5 },
      { label: 'Complex — custom structure, training needed', value: 'complex', complexityPoints: 20, riskPoints: 15 },
    ],
  },
  {
    id: 'custom_functionality',
    question: 'Are custom functionality or interactive features required?',
    options: [
      { label: 'None — standard page layouts', value: 'none', complexityPoints: 0, riskPoints: 0 },
      { label: 'Some — forms, filters, animations', value: 'some', complexityPoints: 15, riskPoints: 10 },
      { label: 'Heavy — APIs, databases, complex logic', value: 'heavy', complexityPoints: 35, riskPoints: 25 },
    ],
  },
  {
    id: 'design_system',
    question: 'Is there an existing design system or brand guidelines?',
    options: [
      { label: 'Yes — comprehensive brand guidelines ready', value: 'yes', complexityPoints: 0, riskPoints: 0 },
      { label: 'Partial — some assets, no formal guidelines', value: 'partial', complexityPoints: 10, riskPoints: 5 },
      { label: 'No — designing from scratch', value: 'no', complexityPoints: 20, riskPoints: 15 },
    ],
  },
  {
    id: 'copywriting',
    question: 'Who is responsible for website copy?',
    options: [
      { label: 'Client provides all copy', value: 'client', complexityPoints: 0, riskPoints: 15 },
      { label: 'We assist / edit client drafts', value: 'assist', complexityPoints: 10, riskPoints: 5 },
      { label: 'We write all copy', value: 'full', complexityPoints: 25, riskPoints: 0 },
    ],
  },
  {
    id: 'integrations',
    question: 'How many third-party integrations are needed?',
    options: [
      { label: 'None', value: 'none', complexityPoints: 0, riskPoints: 0 },
      { label: 'Few — 1–3 (analytics, forms, chat)', value: 'few', complexityPoints: 10, riskPoints: 10 },
      { label: 'Many — 4+ or complex APIs', value: 'many', complexityPoints: 25, riskPoints: 25 },
    ],
  },
  {
    id: 'seo',
    question: 'What level of SEO work is required?',
    options: [
      { label: 'Basic — meta tags and semantic structure', value: 'basic', complexityPoints: 0, riskPoints: 0 },
      { label: 'Full — keyword research, content strategy', value: 'full', complexityPoints: 15, riskPoints: 0 },
      { label: 'Migration — existing SEO equity to preserve', value: 'migration', complexityPoints: 20, riskPoints: 20 },
    ],
  },
  {
    id: 'revision_process',
    question: "How is the client's revision and approval process?",
    options: [
      { label: 'Streamlined — one clear decision maker', value: 'streamlined', complexityPoints: 0, riskPoints: 0 },
      { label: 'Multiple stakeholders — back and forth expected', value: 'stakeholders', complexityPoints: 15, riskPoints: 15 },
      { label: 'Unclear — no defined process agreed', value: 'unclear', complexityPoints: 25, riskPoints: 30 },
    ],
  },
  {
    id: 'budget_status',
    question: 'Has the client disclosed or indicated a budget?',
    options: [
      { label: 'Yes — aligns well with our rates', value: 'aligned', complexityPoints: 0, riskPoints: 0 },
      { label: 'Yes — feels tight or below market', value: 'tight', complexityPoints: 0, riskPoints: 20 },
      { label: 'No budget mentioned', value: 'none', complexityPoints: 0, riskPoints: 25 },
    ],
  },
]

export const SOCIAL_QUESTIONS = [
  {
    id: 'timeline',
    question: 'What is the starting timeline?',
    hint: 'Affects rush pricing multiplier',
    options: [
      { label: 'Relaxed — 4+ weeks to prepare', value: 'relaxed', complexityPoints: 0, riskPoints: 0, rush: 'relaxed' },
      { label: 'Moderate — 2–3 weeks', value: 'moderate', complexityPoints: 5, riskPoints: 5, rush: 'moderate' },
      { label: 'Urgent — 1 week', value: 'urgent', complexityPoints: 15, riskPoints: 20, rush: 'urgent' },
      { label: 'ASAP — starting immediately', value: 'asap', complexityPoints: 25, riskPoints: 35, rush: 'asap' },
    ],
  },
  {
    id: 'platforms',
    question: 'How many social platforms are in scope?',
    options: [
      { label: '1 platform', value: '1', complexityPoints: 0, riskPoints: 0 },
      { label: '2–3 platforms', value: '2-3', complexityPoints: 15, riskPoints: 5 },
      { label: '4+ platforms', value: '4+', complexityPoints: 30, riskPoints: 15 },
    ],
  },
  {
    id: 'posts_per_week',
    question: 'How many posts per week are expected?',
    options: [
      { label: '1–3 posts', value: '1-3', complexityPoints: 0, riskPoints: 0 },
      { label: '4–7 posts', value: '4-7', complexityPoints: 15, riskPoints: 10 },
      { label: '8+ posts', value: '8+', complexityPoints: 30, riskPoints: 15 },
    ],
  },
  {
    id: 'content_creation',
    question: 'What level of content creation is required?',
    options: [
      { label: 'Templates only — client populates content', value: 'templates', complexityPoints: 0, riskPoints: 10 },
      { label: 'Mixed — templates plus some original content', value: 'mixed', complexityPoints: 15, riskPoints: 5 },
      { label: 'Full — all content created by us', value: 'full', complexityPoints: 30, riskPoints: 0 },
    ],
  },
  {
    id: 'strategy_depth',
    question: 'What level of social strategy is needed?',
    options: [
      { label: 'None — straight into execution', value: 'none', complexityPoints: 0, riskPoints: 20 },
      { label: 'Basic — platform and tone guidance', value: 'basic', complexityPoints: 5, riskPoints: 10 },
      { label: 'Full — audit, personas, content pillars, KPIs', value: 'full', complexityPoints: 20, riskPoints: 0 },
    ],
  },
  {
    id: 'reporting',
    question: 'What reporting and analytics are required?',
    options: [
      { label: 'None — client tracks themselves', value: 'none', complexityPoints: 0, riskPoints: 10 },
      { label: 'Monthly — summary report', value: 'monthly', complexityPoints: 5, riskPoints: 0 },
      { label: 'Weekly — detailed performance reports', value: 'weekly', complexityPoints: 20, riskPoints: 0 },
    ],
  },
  {
    id: 'approval_process',
    question: 'How does content approval work?',
    options: [
      { label: 'Easy — one person approves quickly', value: 'easy', complexityPoints: 0, riskPoints: 0 },
      { label: 'Moderate — 2–3 day turnaround', value: 'moderate', complexityPoints: 10, riskPoints: 15 },
      { label: 'Complex — committee or slow feedback', value: 'complex', complexityPoints: 20, riskPoints: 30 },
    ],
  },
  {
    id: 'brand_guidelines',
    question: 'Are brand guidelines and assets available?',
    options: [
      { label: 'Yes — complete guidelines ready to use', value: 'yes', complexityPoints: 0, riskPoints: 0 },
      { label: 'Partial — some assets, no formal guidelines', value: 'partial', complexityPoints: 10, riskPoints: 10 },
      { label: 'No — brand needs defining first', value: 'no', complexityPoints: 25, riskPoints: 15 },
    ],
  },
  {
    id: 'paid_ads',
    question: 'Is paid social / ad management included?',
    options: [
      { label: 'No paid ads in scope', value: 'none', complexityPoints: 0, riskPoints: 0 },
      { label: 'Some — boosted posts or basic campaigns', value: 'some', complexityPoints: 10, riskPoints: 15 },
      { label: 'Full — ad strategy, creative, and management', value: 'full', complexityPoints: 25, riskPoints: 20 },
    ],
  },
  {
    id: 'budget_status',
    question: 'Has the client disclosed a budget or retainer expectation?',
    options: [
      { label: 'Yes — aligns well with our rates', value: 'aligned', complexityPoints: 0, riskPoints: 0 },
      { label: 'Yes — feels tight or below market', value: 'tight', complexityPoints: 0, riskPoints: 20 },
      { label: 'No budget mentioned', value: 'none', complexityPoints: 0, riskPoints: 25 },
    ],
  },
]

export function getQuestions(category) {
  if (category === 'branding') return BRANDING_QUESTIONS
  if (category === 'web') return WEB_QUESTIONS
  if (category === 'social') return SOCIAL_QUESTIONS
  return []
}
