import nodemailer from 'nodemailer'

let cached = null

/**
 * Builds (and reuses) the SMTP transport from environment variables.
 * Works with any provider — Hostinger, Zoho, Google Workspace, SendGrid, SES.
 */
export function getTransport() {
  if (cached) return cached

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error(
      'SMTP is not configured. Copy .env.example to .env and fill in SMTP_HOST, SMTP_USER and SMTP_PASS.',
    )
  }

  const port = Number(SMTP_PORT || 587)

  cached = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    // Port 465 is implicit TLS; 587 and 25 upgrade via STARTTLS.
    secure: SMTP_SECURE ? SMTP_SECURE === 'true' : port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    pool: true,
    maxConnections: 3,
    connectionTimeout: 12000,
    greetingTimeout: 8000,
  })

  return cached
}

const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ))

/** Internal notification sent to the HRU inbox. */
export function buildNotification(data) {
  const rows = [
    ['Name', data.name],
    ['Email', data.email],
    ['Phone', data.phone || '—'],
    ['Company', data.company || '—'],
    ['Service', data.service || '—'],
    ['Budget', data.budget || '—'],
  ]

  const html = `
  <div style="background:#050b18;padding:32px 16px;font-family:Inter,Arial,sans-serif">
    <div style="max-width:600px;margin:0 auto;background:#0b162e;border:1px solid #1b2f55;border-radius:16px;overflow:hidden">
      <div style="padding:24px 28px;background:linear-gradient(135deg,#0a5fe6,#103e91)">
        <h1 style="margin:0;font-size:18px;color:#fff;letter-spacing:.02em">New enquiry — HRU Technologies</h1>
        <p style="margin:6px 0 0;font-size:13px;color:#b8dcff">Submitted via the website contact form</p>
      </div>
      <table style="width:100%;border-collapse:collapse">
        ${rows.map(([label, value]) => `
          <tr>
            <td style="padding:12px 28px;border-bottom:1px solid #12213f;color:#9fb3c8;font-size:13px;width:110px">${esc(label)}</td>
            <td style="padding:12px 28px;border-bottom:1px solid #12213f;color:#fff;font-size:14px">${esc(value)}</td>
          </tr>`).join('')}
      </table>
      <div style="padding:22px 28px">
        <p style="margin:0 0 10px;color:#9fb3c8;font-size:13px">Message</p>
        <div style="padding:16px;background:#070f22;border-left:3px solid #3fe6f5;border-radius:8px;color:#cbd8e6;font-size:14px;line-height:1.65;white-space:pre-wrap">${esc(data.message)}</div>
      </div>
      <div style="padding:16px 28px;background:#030711;color:#5f728a;font-size:11px">
        Received ${new Date().toUTCString()}
      </div>
    </div>
  </div>`

  const text = [
    ...rows.map(([l, v]) => `${l}: ${v}`),
    '',
    'Message:',
    data.message,
  ].join('\n')

  return { html, text }
}

/** Auto-reply sent to the person who filled the form. */
export function buildAutoReply(data, company) {
  const html = `
  <div style="background:#050b18;padding:32px 16px;font-family:Inter,Arial,sans-serif">
    <div style="max-width:560px;margin:0 auto;background:#0b162e;border:1px solid #1b2f55;border-radius:16px;overflow:hidden">
      <div style="padding:28px;background:linear-gradient(135deg,#0a5fe6,#103e91)">
        <h1 style="margin:0;font-size:20px;color:#fff">Thanks for getting in touch</h1>
        <p style="margin:8px 0 0;font-size:13px;color:#b8dcff">${esc(company.tagline)}</p>
      </div>
      <div style="padding:28px;color:#cbd8e6;font-size:14px;line-height:1.7">
        <p style="margin:0 0 16px">Hi ${esc(data.name.split(' ')[0])},</p>
        <p style="margin:0 0 16px">
          We have received your message and someone from our team will read it properly —
          not a bot. You can expect a reply within one business day.
        </p>
        <p style="margin:0 0 8px;color:#9fb3c8;font-size:13px">Here is what you sent us:</p>
        <div style="padding:16px;background:#070f22;border-left:3px solid #3fe6f5;border-radius:8px;color:#9fb3c8;font-size:13px;line-height:1.6;white-space:pre-wrap">${esc(data.message)}</div>
        <p style="margin:20px 0 0">
          If it is urgent, reply to this email directly or call us on ${esc(company.phone)}.
        </p>
        <p style="margin:20px 0 0;color:#9fb3c8">— The ${esc(company.name)} team</p>
      </div>
    </div>
  </div>`

  const text =
    `Hi ${data.name.split(' ')[0]},\n\n` +
    `We have received your message and will reply within one business day.\n\n` +
    `Your message:\n${data.message}\n\n— The ${company.name} team`

  return { html, text }
}
