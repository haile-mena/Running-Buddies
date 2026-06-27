const faqs = [
  {
    q: 'How does RunBud work?',
    a: 'RunBud helps you find running partners based on your location, pace, and goals.',
  },
  {
    q: 'Is RunBud free to use?',
    a: 'Yes! Creating an account and finding matches is completely free.',
  },
  {
    q: 'How are matches determined?',
    a: 'We match runners by proximity, average mileage, pace, and running preferences like terrain and intensity.',
  },
  {
    q: 'Can I chat with my matches?',
    a: 'Absolutely. Once matched, you can message your running buddy directly through the app.',
  },
]

export default function FAQ() {
  return (
    <main className="pt-24 min-h-screen bg-cream px-6">
      <div className="max-w-3xl mx-auto py-16">
        <h1 className="text-5xl font-bold mb-10 text-brown">FAQ</h1>
        <div className="space-y-8">
          {faqs.map(({ q, a }) => (
            <div key={q}>
              <p className="text-lg font-semibold text-gray-800">Q: {q}</p>
              <p className="text-gray-600 mt-1">A: {a}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
