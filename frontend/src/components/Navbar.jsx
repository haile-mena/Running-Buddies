import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()

  return (
    <header className="fixed top-0 w-full bg-cream z-50 shadow-sm">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-bold text-brown">
          RunBud
        </Link>
        <ul className="flex gap-8 list-none">
          <li>
            <Link to="/" className="text-gray-800 hover:text-brown transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-gray-800 hover:text-brown transition-colors">
              About
            </Link>
          </li>
          <li>
            <Link to="/faq" className="text-gray-800 hover:text-brown transition-colors">
              FAQ
            </Link>
          </li>
        </ul>
        <button
          onClick={() => navigate('/sign-in')}
          className="bg-tan hover:bg-brown text-white px-5 py-2 rounded-full transition-colors"
        >
          Sign In
        </button>
      </nav>
    </header>
  )
}
