import { motion } from 'framer-motion'

/**
 * Ambient page backdrop: grid, blue glow orbs and animated circuit traces
 * echoing the etched lines in the HRU mark.
 */
export default function Backdrop({ variant = 'default' }) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 grid-lines opacity-60" />

      {/* fade the grid out toward the bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-900/40 to-ink-900" />

      <div
        className="glow-orb animate-pulse-glow"
        style={{
          width: 560, height: 560, top: '-14rem', left: '-8rem',
          background: 'radial-gradient(circle, rgba(29,128,255,.40), transparent 68%)',
        }}
      />
      <div
        className="glow-orb animate-pulse-glow"
        style={{
          width: 460, height: 460, top: '6rem', right: '-10rem',
          animationDelay: '1.6s',
          background: 'radial-gradient(circle, rgba(63,230,245,.24), transparent 68%)',
        }}
      />

      {variant === 'default' && <CircuitTraces />}
    </div>
  )
}

function CircuitTraces() {
  const paths = [
    'M0 120 H180 L230 70 H420 L470 120 H720',
    'M0 260 H120 L170 310 H390 L440 260 H700',
    'M60 0 V90 L110 140 V300',
    'M640 400 V300 L590 250 V120',
  ]

  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-[0.28]"
      viewBox="0 0 720 400"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <defs>
        <linearGradient id="trace-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1d80ff" stopOpacity="0" />
          <stop offset="50%" stopColor="#3fe6f5" />
          <stop offset="100%" stopColor="#1d80ff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {paths.map((d, i) => (
        <g key={d}>
          <path d={d} stroke="#1d80ff" strokeOpacity="0.16" strokeWidth="1.5" />
          <motion.path
            d={d}
            stroke="url(#trace-grad)"
            strokeWidth="1.8"
            strokeLinecap="round"
            style={{ strokeDasharray: 220 }}
            initial={{ strokeDashoffset: 220, opacity: 0 }}
            animate={{ strokeDashoffset: [220, 0, -220], opacity: [0, 1, 0] }}
            transition={{
              duration: 5.5,
              delay: i * 1.15,
              repeat: Infinity,
              repeatDelay: 1.6,
              ease: 'easeInOut',
            }}
          />
        </g>
      ))}

      {[[230, 70], [440, 260], [110, 140], [590, 250]].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" fill="#3fe6f5" opacity="0.55" />
      ))}
    </svg>
  )
}
