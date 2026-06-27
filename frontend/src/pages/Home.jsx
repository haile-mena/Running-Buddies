import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-cream text-center px-4">
      <h1 className="text-7xl font-bold mb-6">RunBud</h1>
      <p className="text-xl text-gray-600 mb-10 max-w-md">
        Find your perfect running partner. Build your community. Run further, together.
      </p>
      <button
        onClick={() => navigate('/sign-up')}
        className="bg-tan hover:bg-brown text-white text-lg px-10 py-3 rounded-full transition-colors"
      >
        Find a Buddy
      </button>
    </main>
  )
}
