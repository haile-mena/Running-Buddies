import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Welcome() {
  const { user, refreshUser } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate('/sign-in')
    }
  }, [user, navigate])

  const completeOnboarding = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/users/${user.id}/complete-onboarding`, {
        method: 'POST',
      })
      const updated = await res.json()
      refreshUser(updated)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (!user) return null

  return (
    <main className="pt-24 min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-lg p-10 text-center">
        {user.is_new ? (
          <>
            <h1 className="text-3xl font-bold text-brown mb-4">
              new user {user.first_name}
            </h1>
            <p className="text-gray-600 mb-6">
              First-time form placeholder. This is where the onboarding questions will go.
            </p>
            <button
              onClick={completeOnboarding}
              disabled={loading}
              className="bg-tan hover:bg-brown text-white py-3 px-8 rounded-full font-semibold transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Continue'}
            </button>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-brown mb-4">
              welcome existing user {user.first_name}
            </h1>
            <p className="text-gray-600">You are signed in. Start finding your running buddy.</p>
          </>
        )}
      </div>
    </main>
  )
}
