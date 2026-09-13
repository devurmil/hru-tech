# HRU Technologies — Company Website

Marketing site for HRU Technologies. Five pages (Home, Services, Projects, About,
Contact) plus a 404, with a working contact form that sends real email over SMTP.

**Stack:** Vite + React 19 · Tailwind CSS v4 · Framer Motion · Express + Nodemailer

---

## Quick start

```bash
npm install
cp .env.example .env     # then fill in your SMTP credentials
npm run dev
```

`npm run dev` starts both processes at once:

| URL | What |
| --- | --- |
| http://localhost:5173 | the site (Vite dev server, hot reload) |
| http://localhost:8787 | the API (Express) |

Vite proxies `/api/*` to the Express server, so the contact form works in dev
exactly as it does in production.

### Scripts

| Command | Does |
| --- | --- |
| `npm run dev` | site + API together |
| `npm run dev:web` | site only |
| `npm run dev:api` | API only |
| `npm run build` | production build into `dist/` |
| `npm start` | serve `dist/` **and** the API from one Express process on `:8787` |

---

## Configuring the contact form (SMTP)

Copy `.env.example` to `.env` and fill it in. Nothing else needs changing — the
form posts to `/api/contact`, which sends two emails:

1. **The enquiry**, to `MAIL_TO`, with `Reply-To` set to the sender so you can
   reply straight from your inbox.
2. **An auto-reply**, to whoever filled in the form. Set `SEND_AUTOREPLY=false`
   to turn this off.

```ini
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=hello@hrutechnologies.com
SMTP_PASS=your-mailbox-password
MAIL_TO=hello@hrutechnologies.com
```

`SMTP_SECURE` is auto-detected (`true` for port 465, `false` for 587) — only set
it if your provider needs something unusual.

### Provider settings

| Provider | Host | Port |
| --- | --- | --- |
| Hostinger | `smtp.hostinger.com` | 465 |
| Zoho Mail | `smtp.zoho.com` (`.eu` / `.in` regionally) | 465 |
| Google Workspace | `smtp.gmail.com` | 587 — needs an [App Password](https://myaccount.google.com/apppasswords) |
| Microsoft 365 | `smtp.office365.com` | 587 |
| SendGrid | `smtp.sendgrid.net` | 587 — username is literally `apikey` |
| Amazon SES | `email-smtp.<region>.amazonaws.com` | 587 |

### Checking it works

```bash
curl localhost:8787/api/health
# {"ok":true,"smtpConfigured":true}
```

If `smtpConfigured` is `false`, the `.env` file isn't being read or a variable is
missing. Send failures are logged to the server console with the provider's own
error message.

---

## Deploying

The build is a static `dist/` folder plus one small Node process.

**Single server (simplest — VPS, Hostinger, Railway, Render):**

```bash
npm install && npm run build
NODE_ENV=production npm start
```

Express serves `dist/` and the API from the same port, so SPA routes like
`/projects` resolve correctly on a hard refresh. Put nginx or your host's proxy
in front of it for TLS.

**Split hosting (static host + separate API):** deploy `dist/` to Netlify,
Vercel or Cloudflare Pages, run `server/` anywhere Node runs, then set
`CORS_ORIGIN=https://yourdomain.com` on the API and point the form's `fetch` at
its absolute URL. Add an SPA rewrite (`/*` → `/index.html`) on the static host.

> Set `CORS_ORIGIN` to your real domain in production. Left blank it accepts any
> origin, which is convenient in dev and too permissive in production.

---

## Spam and abuse protection

Already in place on `POST /api/contact`:

- **Rate limit** — 5 submissions per IP per 15 minutes.
- **Honeypot** — a hidden `website` field; anything that fills it gets a silent `200`.
- **Server-side validation** — the client checks are for UX only, never trusted.
- **Header-injection guard** — newlines rejected in `name` and `email`.
- **HTML escaping** — all submitted values are escaped before going into the email body.

If you start seeing spam anyway, adding a CAPTCHA to the same endpoint is the
next step.

---

## Editing content

Almost all copy lives in one file: **`src/data/site.js`** — services, projects,
stats, team, timeline, FAQs, contact details. Change it there and every page
updates. No CMS needed.

Contact details currently contain placeholders — search `site.js` for `TODO`.

### Project structure

```
src/
  data/site.js        all site copy and content
  components/         Navbar, Footer, Reveal, Backdrop, Button, …
  pages/              Home, Services, Projects, About, Contact, NotFound
  index.css           design tokens, brand palette, keyframes
server/
  index.js            Express app: /api/contact, /api/health, static serving
  mailer.js           SMTP transport and the two email templates
public/               logo, cropped emblem, favicon
```

### Brand palette

Defined once as CSS custom properties in `src/index.css` under `@theme`:

| Token | Value | Used for |
| --- | --- | --- |
| `--color-ink-900` | `#050b18` | page background |
| `--color-brand-500` | `#1d80ff` | primary blue |
| `--color-cyan-glow` | `#3fe6f5` | accent, taken from the logo's circuit glow |
| `--color-steel` | `#9fb3c8` | body text |

---

## Accessibility & performance

- Every animation is disabled under `prefers-reduced-motion`.
- Keyboard focus rings, a skip-to-content link, and labelled form fields throughout.
- Routes are code-split; only the Home page ships in the initial bundle.
- First load is roughly 150 KB gzipped including fonts.
