export default function HelpPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Help Center</h1>
          <p className="text-xl text-blue-100">How can we help you today?</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for help..."
              className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 text-lg"
            />
            <button className="absolute right-2 top-2 bg-blue-900 text-white px-6 py-2 rounded-lg">
              Search
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Orders & Shipping</h3>
            <p className="text-gray-600 text-sm">Track orders, shipping info, and delivery</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Returns & Refunds</h3>
            <p className="text-gray-600 text-sm">Return policy and refund process</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Payment & Billing</h3>
            <p className="text-gray-600 text-sm">Payment methods and billing questions</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              'How do I track my order?',
              'What is your return policy?',
              'How long does shipping take?',
              'Do you ship internationally?',
              'How can I cancel my order?',
            ].map((question, i) => (
              <details key={i} className="border-b pb-4">
                <summary className="font-semibold cursor-pointer hover:text-blue-600">{question}</summary>
                <p className="mt-2 text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                  labore et dolore magna aliqua.
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
