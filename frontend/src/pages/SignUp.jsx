import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <main className="pt-24 min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-10">
        <h1 className="text-3xl font-bold text-center text-brown mb-8">Sign Up</h1>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="First Name"
            className="border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-tan"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-tan"
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-tan"
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-tan"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-tan"
          />
          <button
            type="submit"
            className="bg-tan hover:bg-brown text-white py-3 rounded-full text-base font-semibold transition-colors"
          >
            Create Account
          </button>
        </form>
        <p className="text-center text-gray-500 mt-6 text-sm">
          Already have an account?{' '}
          <Link to="/sign-in" className="text-brown font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </main>
  )
}
