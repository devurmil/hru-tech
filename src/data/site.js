export const company = {
  name: 'HRU Technologies',
  short: 'HRU',
  tagline: 'Intelligence in Every Line',
  // TODO: replace the placeholders below with your real details
  email: 'hello@hrutechnologies.com',
  phone: '+91 00000 00000',
  address: 'Surat, Gujarat, India',
  founded: 2019,
  social: {
    linkedin: '#',
    github: '#',
    x: '#',
  },
}

export const stats = [
  { value: 120, suffix: '+', label: 'Projects delivered' },
  { value: 40,  suffix: '+', label: 'Clients worldwide' },
  { value: 6,   suffix: ' yrs', label: 'Building software' },
  { value: 99,  suffix: '.9%', label: 'Uptime maintained' },
]

export const services = [
  {
    slug: 'software',
    icon: 'Code2',
    title: 'Custom Software & Web Apps',
    blurb:
      'Product-grade web platforms, internal tools and APIs — architected to stay fast as your data and your team grow.',
    points: [
      'React, Next.js & TypeScript front-ends',
      'Node, Python & Go service layers',
      'PostgreSQL, Redis and event-driven design',
      'Design systems and component libraries',
    ],
    deliverables: ['Discovery & architecture', 'UI/UX design', 'Build & QA', 'Handover + docs'],
  },
  {
    slug: 'ai',
    icon: 'BrainCircuit',
    title: 'AI & Machine Learning',
    blurb:
      'We put models to work where they actually move a number — support deflection, document handling, forecasting, search.',
    points: [
      'LLM assistants & retrieval (RAG) pipelines',
      'Document extraction and classification',
      'Forecasting and recommendation models',
      'Evaluation harnesses so quality is measured, not guessed',
    ],
    deliverables: ['Use-case scoping', 'Data pipeline', 'Model + eval suite', 'Production rollout'],
  },
  {
    slug: 'mobile',
    icon: 'Smartphone',
    title: 'Mobile App Development',
    blurb:
      'Native-feeling iOS and Android apps from one codebase — offline-ready, store-compliant and genuinely pleasant to use.',
    points: [
      'React Native & Flutter',
      'Offline-first sync and local storage',
      'Push notifications and deep links',
      'App Store & Play Store release management',
    ],
    deliverables: ['Prototype', 'Cross-platform build', 'Store submission', 'Release support'],
  },
  {
    slug: 'cloud',
    icon: 'CloudCog',
    title: 'Cloud & DevOps',
    blurb:
      'Infrastructure that deploys itself, scales on demand and tells you before it breaks — not after.',
    points: [
      'AWS, GCP and Azure architecture',
      'Terraform, Docker and Kubernetes',
      'CI/CD pipelines and zero-downtime deploys',
      'Observability, cost control and hardening',
    ],
    deliverables: ['Infra audit', 'IaC migration', 'Pipeline setup', 'Monitoring & on-call runbooks'],
  },
]

export const process = [
  {
    step: '01',
    title: 'Discover',
    body: 'We sit with your team, map the workflow as it really runs, and write down what success will look like in numbers.',
  },
  {
    step: '02',
    title: 'Design',
    body: 'Architecture, data model and interface are decided before a line of production code is written — and reviewed with you.',
  },
  {
    step: '03',
    title: 'Build',
    body: 'Two-week sprints against a shared board. You see working software every fortnight, never a status slide.',
  },
  {
    step: '04',
    title: 'Scale',
    body: 'We ship, watch the metrics, harden the edges and hand over documentation your own engineers can build on.',
  },
]

export const projects = [
  {
    slug: 'atlas-logistics',
    title: 'Atlas Freight Console',
    client: 'Logistics',
    year: 2025,
    summary:
      'A live dispatch console replacing a spreadsheet-and-phone workflow for a 400-vehicle fleet.',
    problem:
      'Dispatchers were reconciling driver locations across WhatsApp, a shared sheet and three regional coordinators. Mis-assignments cost roughly 90 minutes of idle truck time a day.',
    solution:
      'We built a real-time console on a websocket event stream, with map-based assignment, automatic ETA recalculation and a driver app for status capture.',
    outcome: [
      { metric: '31%', label: 'Drop in idle vehicle hours' },
      { metric: '4.2s', label: 'Average assignment time' },
      { metric: '400+', label: 'Vehicles tracked live' },
    ],
    stack: ['React', 'Node.js', 'PostgreSQL', 'Mapbox', 'AWS'],
    accent: 'from-brand-500/25 to-cyan-glow/10',
  },
  {
    slug: 'ledgerlens',
    title: 'LedgerLens Document AI',
    client: 'Fintech',
    year: 2025,
    summary:
      'Invoice and statement extraction that took a finance team off manual data entry.',
    problem:
      'A lending team manually keyed figures from 2,000+ supplier invoices a month across 40 different layouts, with a 6% error rate feeding straight into credit decisions.',
    solution:
      'A layout-agnostic extraction pipeline combining OCR, a fine-tuned classifier and an LLM reconciliation pass, with a human-review queue for anything below a confidence threshold.',
    outcome: [
      { metric: '94%', label: 'Straight-through processing' },
      { metric: '11x', label: 'Faster per-document turnaround' },
      { metric: '0.4%', label: 'Post-review error rate' },
    ],
    stack: ['Python', 'FastAPI', 'PyTorch', 'Postgres', 'GCP'],
    accent: 'from-cyan-glow/20 to-brand-600/15',
  },
  {
    slug: 'meridian-health',
    title: 'Meridian Care App',
    client: 'Healthcare',
    year: 2024,
    summary:
      'An offline-first field app for community health workers across low-connectivity districts.',
    problem:
      'Health workers collected patient data on paper in areas with intermittent signal. Records reached the central system up to three weeks late, if at all.',
    solution:
      'A React Native app with a local-first datastore and conflict-aware sync, plus a clinician dashboard. Visits are recorded offline and reconciled the moment a device finds a network.',
    outcome: [
      { metric: '18k', label: 'Patient records digitised' },
      { metric: '< 1 day', label: 'Data-to-dashboard latency' },
      { metric: '96%', label: 'Worker adoption in 3 months' },
    ],
    stack: ['React Native', 'SQLite', 'Node.js', 'Azure'],
    accent: 'from-brand-400/20 to-brand-800/20',
  },
  {
    slug: 'northwind-cloud',
    title: 'Northwind Cloud Migration',
    client: 'Manufacturing',
    year: 2024,
    summary:
      'Lifting a decade-old monolith off ageing on-prem hardware without a maintenance window.',
    problem:
      'A production-critical ERP ran on hardware out of vendor support. Any outage halted the factory floor, so a big-bang migration was off the table.',
    solution:
      'We containerised the application, moved it service by service behind a routing layer, and codified the whole estate in Terraform with automated rollback.',
    outcome: [
      { metric: '0 min', label: 'Unplanned downtime' },
      { metric: '43%', label: 'Lower infrastructure spend' },
      { metric: '12 min', label: 'Deploy time, from 2 days' },
    ],
    stack: ['Terraform', 'Kubernetes', 'Docker', 'AWS', 'Grafana'],
    accent: 'from-brand-600/20 to-cyan-glow/10',
  },
  {
    slug: 'vantage-retail',
    title: 'Vantage Demand Forecasting',
    client: 'Retail',
    year: 2023,
    summary:
      'Store-level demand forecasting that cut both stockouts and dead inventory.',
    problem:
      'Purchasing ran on last-year-plus-a-percentage. Fast lines sold out mid-week while slow lines tied up capital on the shelf.',
    solution:
      'A gradient-boosted forecasting model per SKU-store pair, blended with promotion and weather signals, surfaced through a simple weekly ordering sheet buyers actually use.',
    outcome: [
      { metric: '27%', label: 'Fewer stockouts' },
      { metric: '19%', label: 'Less excess inventory' },
      { metric: '140', label: 'Stores live' },
    ],
    stack: ['Python', 'XGBoost', 'Airflow', 'BigQuery', 'React'],
    accent: 'from-cyan-glow/15 to-brand-700/20',
  },
  {
    slug: 'helix-devportal',
    title: 'Helix Developer Portal',
    client: 'SaaS',
    year: 2023,
    summary:
      'A self-serve API portal that took integration support off the engineering team.',
    problem:
      'Every customer integration needed an engineer on a call. Onboarding a partner took three weeks and engineering time was disappearing into support.',
    solution:
      'A documentation portal with interactive API playground, sandbox keys, usage dashboards and generated client SDKs in four languages.',
    outcome: [
      { metric: '3 days', label: 'Partner onboarding, from 3 weeks' },
      { metric: '71%', label: 'Fewer integration support tickets' },
      { metric: '4', label: 'Generated SDKs' },
    ],
    stack: ['Next.js', 'OpenAPI', 'TypeScript', 'Vercel'],
    accent: 'from-brand-500/20 to-brand-900/20',
  },
]

export const values = [
  {
    icon: 'Compass',
    title: 'Clarity before code',
    body: 'We would rather spend a week understanding the problem than a quarter building the wrong answer. Every engagement starts with a written definition of done.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Own the outcome',
    body: 'We are not finished when the code merges. We are finished when the number you cared about has moved and your team can maintain what we built.',
  },
  {
    icon: 'Layers',
    title: 'Build to be handed over',
    body: 'Readable code, real documentation, no private knowledge. If we vanished tomorrow, your engineers could pick it up on Monday.',
  },
  {
    icon: 'MessageSquareCode',
    title: 'Say the hard thing early',
    body: 'If a deadline is unrealistic or a feature is not worth building, you hear it in week one — not in a post-mortem.',
  },
]

export const team = [
  { name: 'Engineering', count: 14, note: 'Full-stack, mobile and platform engineers' },
  { name: 'AI & Data', count: 5, note: 'ML engineers and data scientists' },
  { name: 'Design', count: 4, note: 'Product and interface designers' },
  { name: 'Delivery', count: 3, note: 'Project leads and QA' },
]

export const timeline = [
  { year: '2019', title: 'Founded', body: 'HRU Technologies starts as a three-person team building web platforms for regional businesses.' },
  { year: '2021', title: 'Cloud practice', body: 'We add a dedicated infrastructure team after our third large migration engagement.' },
  { year: '2023', title: 'AI division', body: 'Our machine-learning group forms around document AI and forecasting work.' },
  { year: '2025', title: 'Global delivery', body: 'Now 26 people serving clients across India, the UK, the UAE and North America.' },
]

export const faqs = [
  {
    q: 'How do engagements usually start?',
    a: 'With a paid discovery of one to two weeks. You get an architecture outline, a scoped plan and a fixed estimate — and you own that document whether or not you continue with us.',
  },
  {
    q: 'What does a project typically cost?',
    a: 'Most builds land between a focused 4-week module and a 6-month platform. We quote a fixed price per phase after discovery, so there are no open-ended hourly surprises.',
  },
  {
    q: 'Do you work with our in-house team?',
    a: 'Often. We can run a project end to end, embed engineers alongside yours, or act as an architecture and review partner. All three are normal for us.',
  },
  {
    q: 'What happens after launch?',
    a: 'We hand over documentation and a runbook, and offer a support retainer if you want us on call. There is no lock-in — the code and infrastructure are yours from day one.',
  },
  {
    q: 'How quickly can you start?',
    a: 'Discovery usually begins within two weeks of signing. Larger builds are scheduled against team availability, which we will tell you honestly on the first call.',
  },
]

export const industries = [
  'Fintech', 'Healthcare', 'Logistics', 'Retail', 'Manufacturing',
  'Education', 'Real Estate', 'SaaS', 'Energy', 'Hospitality',
]
