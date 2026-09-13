import { Link } from 'react-router-dom'

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-cyan-glow disabled:cursor-not-allowed disabled:opacity-60'

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

const variants = {
  primary:
    'bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-[0_8px_30px_-10px_rgba(29,128,255,.85)] hover:shadow-[0_14px_44px_-10px_rgba(63,230,245,.7)] hover:-translate-y-0.5',
  ghost:
    'border border-brand-400/25 bg-white/[0.03] text-steel-light backdrop-blur hover:border-cyan-glow/45 hover:bg-white/[0.06] hover:text-white hover:-translate-y-0.5',
  quiet:
    'text-steel hover:text-cyan-glow',
}

export default function Button({
  as = 'link',
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`

  if (as === 'link' && to) return <Link to={to} className={cls} {...rest}>{children}</Link>
  if (as === 'a' || href) {
    return <a href={href} className={cls} {...rest}>{children}</a>
  }
  return <button className={cls} {...rest}>{children}</button>
}
