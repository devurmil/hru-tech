import { Link } from 'react-router-dom'
import { company } from '../data/site'

export default function Logo({ compact = false }) {
  return (
    <Link to="/" className="group flex items-center gap-3" aria-label={`${company.name} — home`}>
      <span className="relative grid h-11 w-11 shrink-0 place-items-center">
        <span className="absolute inset-0 rounded-xl bg-cyan-glow/25 blur-md transition-all duration-500 group-hover:bg-cyan-glow/50 group-hover:blur-lg" />
        <img
          src="/hru-mark.webp"
          alt=""
          width="44"
          height="44"
          className="relative h-11 w-11 rounded-xl object-cover ring-1 ring-brand-400/30 transition-transform duration-500 group-hover:scale-105"
        />
      </span>

      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[1.05rem] font-extrabold tracking-[0.14em] text-metal">
            HRU
          </span>
          <span className="mt-1 text-[0.6rem] font-medium uppercase tracking-[0.28em] text-steel/70">
            Technologies
          </span>
        </span>
      )}
    </Link>
  )
}
