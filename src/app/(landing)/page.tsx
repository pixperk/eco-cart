import { ShoppingCart, Leaf, Sparkles, List } from 'lucide-react';

export default function Component() {
  return (
    <div className="min-h-screen bg-green-50 text-green-900 dark:bg-gray-900 dark:text-green-100 font-sans transition-colors duration-300 flex flex-col justify-between">
      
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-8 space-y-16">
        <header className="text-center py-8 space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-green-800 dark:text-green-200 mb-6">
            Smart, Sustainable Shopping with EcoCart
          </h1>
          <p className="text-xl text-green-700 dark:text-green-300 mb-10">
            Eco-friendly, AI-powered recommendations for conscious shopping
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="bg-green-600 text-white px-10 py-4 rounded-lg text-lg font-semibold flex items-center justify-center hover:bg-green-700 transition-colors">
              <List className="mr-2" />
              Create Custom List
            </button>
            <button className="bg-teal-500 text-white px-10 py-4 rounded-lg text-lg font-semibold flex items-center justify-center hover:bg-teal-600 transition-colors">
              <Sparkles className="mr-2" />
              Make AI Do It All
            </button>
          </div>
        </header>
        
        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-10 mb-20">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg space-y-4">
            <ShoppingCart className="h-12 w-12 text-green-600 dark:text-green-400" />
            <h3 className="text-2xl font-semibold">Smart Recommendations</h3>
            <p className="dark:text-gray-300">
              Get personalized, eco-friendly product suggestions based on your preferences and shopping history.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg space-y-4">
            <Leaf className="h-12 w-12 text-green-600 dark:text-green-400" />
            <h3 className="text-2xl font-semibold">Sustainability Scores</h3>
            <p className="dark:text-gray-300">
              See the environmental impact of your choices and make informed decisions for a greener planet.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg space-y-4">
            <Sparkles className="h-12 w-12 text-green-600 dark:text-green-400" />
            <h3 className="text-2xl font-semibold">AI-Powered Lists</h3>
            <p className="dark:text-gray-300">
              Let our AI create the perfect eco-friendly shopping list tailored to your needs and preferences.
            </p>
          </div>
        </div>
      </main>

      {/* Testimonial Section */}
      <section className="bg-green-100 dark:bg-gray-800 py-12 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="text-2xl italic font-medium text-green-800 dark:text-green-300">
            "Small acts, when multiplied by millions of people, can transform the world."
          </p>
          <p className="text-green-600 dark:text-green-400">- Howard Zinn</p>
        </div>
      </section>

      {/* Background Illustrations */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10 dark:opacity-5">
        <svg className="absolute top-0 left-0 h-72 w-72 text-green-600 dark:text-green-800" fill="currentColor" viewBox="0 0 100 100">
          <path d="M95,50 Q100,75 75,95 Q50,100 25,75 Q0,50 25,25 Q50,0 75,5 Q100,25 95,50 Z" />
        </svg>
        <svg className="absolute bottom-0 right-0 h-72 w-72 text-green-600 dark:text-green-800" fill="currentColor" viewBox="0 0 100 100">
          <path d="M5,50 Q0,25 25,5 Q50,0 75,25 Q100,50 75,75 Q50,100 25,95 Q0,75 5,50 Z" />
        </svg>
        <svg className="absolute top-1/2 left-1/4 h-36 w-36 text-teal-400 dark:text-teal-600" fill="currentColor" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" />
        </svg>
        <svg className="absolute bottom-1/4 right-1/3 h-56 w-56 text-green-400 dark:text-green-700" fill="currentColor" viewBox="0 0 100 100">
          <path d="M50,0 Q75,25 100,50 Q75,75 50,100 Q25,75 0,50 Q25,25 50,0 Z" />
        </svg>
      </div>
    </div>
  );
}
