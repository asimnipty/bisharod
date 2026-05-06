import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-bisharod-navy flex flex-col items-center justify-center text-center px-6">
      <p className="font-mono text-bisharod-teal text-6xl font-bold mb-4">404</p>
      <h1 className="font-display text-2xl text-white mb-3">Page not found</h1>
      <p className="text-white/40 text-sm mb-8">The page you're looking for doesn't exist.</p>
      <Link to="/" className="px-5 py-2.5 bg-bisharod-teal text-bisharod-navy font-semibold text-sm rounded hover:bg-bisharod-teal-light transition-colors">
        Go Home
      </Link>
    </div>
  )
}
