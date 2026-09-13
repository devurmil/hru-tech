import 'dotenv/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'
import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import { getTransport, buildNotification, buildAutoReply } from './mailer.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const PORT = Number(process.env.PORT || 8787)
const COMPANY = {
  name: process.env.COMPANY_NAME || 'HRU Technologies',
  tagline: 'Intelligence in Every Line',
  phone: process.env.COMPANY_PHONE || '+91 00000 00000',
}

const app = express()
app.set('trust proxy', 1)
app.use(express.json({ limit: '32kb' }))
app.use(cors({ origin: process.env.CORS_ORIGIN || true }))

/* ------------------------------------------------------------ validation */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(body) {
  const errors = {}
  const name = String(body.name || '').trim()
  const email = String(body.email || '').trim()
  const message = String(body.message || '').trim()

  if (name.length < 2) errors.name = 'Please enter your name.'
  if (name.length > 100) errors.name = 'That name is too long.'
  if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.'
  if (message.length < 10) errors.message = 'Please tell us a little more (10 characters minimum).'
  if (message.length > 5000) errors.message = 'That message is too long (5000 characters maximum).'

  // Header-injection guard: newlines never belong in these single-line fields.
  for (const [key, value] of Object.entries({ name, email })) {
    if (/[\r\n]/.test(value)) errors[key] = 'Invalid characters.'
  }

  return {
    errors,
    data: {
      name,
      email,
      message,
      phone: String(body.phone || '').trim().slice(0, 40),
      company: String(body.company || '').trim().slice(0, 120),
      service: String(body.service || '').trim().slice(0, 80),
      budget: String(body.budget || '').trim().slice(0, 80),
    },
  }
}

/* ------------------------------------------------------------- rate limit */

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    ok: false,
    error: 'Too many messages from this address. Please try again in a few minutes.',
  },
})

/* ---------------------------------------------------------------- routes */

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    smtpConfigured: Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS),
  })
})

app.post('/api/contact', contactLimiter, async (req, res) => {
  // Honeypot: real people never fill a hidden field. Answer 200 so bots learn nothing.
  if (req.body?.website) return res.json({ ok: true })

  const { errors, data } = validate(req.body || {})
  if (Object.keys(errors).length) {
    return res.status(400).json({ ok: false, errors })
  }

  try {
    const transport = getTransport()
    const from = process.env.MAIL_FROM || `"${COMPANY.name} Website" <${process.env.SMTP_USER}>`
    const to = process.env.MAIL_TO || process.env.SMTP_USER

    const notification = buildNotification(data)
    await transport.sendMail({
      from,
      to,
      replyTo: `"${data.name}" <${data.email}>`,
      subject: `New enquiry — ${data.name}${data.company ? ` (${data.company})` : ''}`,
      text: notification.text,
      html: notification.html,
    })

    // The auto-reply is a courtesy: if it fails, the enquiry still went through.
    if (process.env.SEND_AUTOREPLY !== 'false') {
      const reply = buildAutoReply(data, COMPANY)
      transport
        .sendMail({
          from,
          to: data.email,
          subject: `We received your message — ${COMPANY.name}`,
          text: reply.text,
          html: reply.html,
        })
        .catch((err) => console.error('[contact] auto-reply failed:', err.message))
    }

    console.log(`[contact] enquiry from ${data.email}`)
    res.json({ ok: true })
  } catch (err) {
    console.error('[contact] send failed:', err)
    res.status(502).json({
      ok: false,
      error:
        'We could not send your message right now. Please email us directly and we will pick it up.',
    })
  }
})

/* ------------------------------------- serve the built SPA in production */

const dist = path.join(root, 'dist')
if (fs.existsSync(dist)) {
  app.use(express.static(dist, { maxAge: '1y', index: false }))
  app.get(/^(?!\/api\/).*/, (_req, res) => res.sendFile(path.join(dist, 'index.html')))
}

app.listen(PORT, () => {
  const ready = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)
  console.log(`\n  HRU API listening on http://localhost:${PORT}`)
  console.log(`  SMTP: ${ready ? 'configured' : 'NOT configured — copy .env.example to .env'}\n`)
})
