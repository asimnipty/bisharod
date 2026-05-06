import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Lock, Mail } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800)) // simulate auth call

    // Demo: any credentials work
    if (email && password) {
      login({ id: '1', name: 'Demo User', email, role: 'analyst', organizationId: 'org-1' })
      navigate('/portal')
    } else {
      setError('Please enter email and password.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-bisharod-navy flex items-center justify-center px-6">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-10">
          <Link to="/">
            <img src="/logo.png" alt="Bisharod" className="h-12 mx-auto mb-6" />
          </Link>
          <h1 className="font-display text-2xl text-white mb-1">Authorized Access</h1>
          <p className="text-white/40 text-sm">Sign in to the Bisharod data portal</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white/[0.04] border border-bisharod-teal/20 rounded-xl p-8 space-y-5">

          <div>
            <label className="block text-xs font-semibold text-white/60 uppercase tracking-widest mb-2">Email</label>
            <div className="relative">
              <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@organization.com"
                className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/15 rounded-lg text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-bisharod-teal transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/60 uppercase tracking-widest mb-2">Password</label>
            <div className="relative">
              <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/15 rounded-lg text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-bisharod-teal transition-colors"
              />
            </div>
          </div>

          {error && <p className="text-red-400 text-xs">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-bisharod-teal text-bisharod-navy font-semibold text-sm rounded-lg hover:bg-bisharod-teal-light transition-colors disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>

          <p className="text-center text-white/30 text-xs">
            SMART on FHIR · OAuth 2.0 secured
          </p>
        </form>
      </div>
    </div>
  )
}
