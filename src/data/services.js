export const CATEGORIES = [
  {
    id: 'branding',
    label: 'Branding',
    description: 'Identity systems, brand strategy, and visual language',
    icon: '◈',
  },
  {
    id: 'web',
    label: 'Web Design',
    description: 'Websites, landing pages, and digital experiences',
    icon: '⬡',
  },
  {
    id: 'social',
    label: 'Social Media',
    description: 'Templates, strategy, retainers, and content management',
    icon: '◎',
  },
]

export const SERVICES = {
  branding: [
    { id: 'starter-identity', label: 'Starter Identity', minDays: 5, maxDays: 8 },
    { id: 'full-brand-identity', label: 'Full Brand Identity', minDays: 10, maxDays: 15 },
    { id: 'strategy-led-brand', label: 'Strategy-Led Brand', minDays: 15, maxDays: 25 },
    { id: 'rebrand', label: 'Rebrand', minDays: 12, maxDays: 20 },
    { id: 'brand-system', label: 'Brand System', minDays: 20, maxDays: 30 },
  ],
  web: [
    { id: 'portfolio', label: 'Portfolio', minDays: 5, maxDays: 8 },
    { id: 'marketing-site', label: 'Marketing Site', minDays: 10, maxDays: 15 },
    { id: 'ecommerce', label: 'E-commerce', minDays: 15, maxDays: 25 },
    { id: 'custom-build', label: 'Custom Build', minDays: 20, maxDays: 35 },
    { id: 'redesign', label: 'Redesign', minDays: 8, maxDays: 15 },
  ],
  social: [
    { id: 'template-system', label: 'Template System', minDays: 5, maxDays: 8 },
    { id: 'social-strategy', label: 'Social Strategy', minDays: 3, maxDays: 5 },
    { id: 'light-retainer', label: 'Light Retainer', minDays: 8, maxDays: 12 },
    { id: 'full-management', label: 'Full Management', minDays: 15, maxDays: 20 },
  ],
}
