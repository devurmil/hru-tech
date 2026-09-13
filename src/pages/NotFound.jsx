import { ArrowLeft } from 'lucide-react'
import Backdrop from '../components/Backdrop'
import Button from '../components/Button'

export default function NotFound() {
  return (
    <section className="relative grid min-h-[80vh] place-items-center overflow-hidden px-5">
      <Backdrop />
      <div className="text-center">
        <p className="font-display text-7xl font-extrabold text-gradient sm:text-9xl">404</p>
        <h1 className="mt-6 text-2xl font-bold sm:text-3xl">This page does not exist</h1>
        <p className="mx-auto mt-4 max-w-md text-steel">
          The link may be out of date, or the page may have moved. Everything else is
          still where you left it.
        </p>
        <div className="mt-9">
          <Button to="/" size="lg">
            <ArrowLeft size={17} className="transition-transform duration-300 group-hover:-translate-x-1" />
            Back to home
          </Button>
        </div>
      </div>
    </section>
  )
}
