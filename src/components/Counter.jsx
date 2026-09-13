import { useEffect, useRef, useState } from 'react'

/** Counts up from 0 to `value` the first time it scrolls into view. */
export default function Counter({ value, suffix = '', duration = 1500 }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setDisplay(value)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return
        started.current = true

        const start = performance.now()
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1)
          // ease-out cubic
          const eased = 1 - Math.pow(1 - p, 3)
          setDisplay(Number((value * eased).toFixed(value % 1 === 0 ? 0 : 1)))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [value, duration])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}
