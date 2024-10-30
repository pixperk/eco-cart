
import { Header } from '@/components/Header'
import { ShoppingCart, Leaf, Sparkles } from 'lucide-react'


export default function Component() {
  return (
    <div className="min-h-screen bg-green-50 text-green-900 dark:bg-gray-900 dark:text-green-100 font-sans transition-colors duration-300 flex flex-col justify-between">
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
        
        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <ShoppingCart className="h-12 w-12 text-green-600 dark:text-green-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Smart Recommendations</h3>
            <p className="dark:text-gray-300">Get personalized, eco-friendly product suggestions based on your preferences and shopping history.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <Leaf className="h-12 w-12 text-green-600 dark:text-green-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Sustainability Scores</h3>
            <p className="dark:text-gray-300">See the environmental impact of your choices and make informed decisions for a greener planet.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <Sparkles className="h-12 w-12 text-green-600 dark:text-green-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI-Powered Lists</h3>
            <p className="dark:text-gray-300">Let our AI create the perfect eco-friendly shopping list tailored to your needs and preferences.</p>
          </div>
        </div>
      </main>

      {/* Testimonial Section */}
      <section className="bg-green-100 dark:bg-gray-800 py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-2xl italic font-medium text-green-800 dark:text-green-300">"Small acts, when multiplied by millions of people, can transform the world."</p>
          <p className="mt-4 text-green-600 dark:text-green-400">- Howard Zinn</p>
        </div>
      </section>

      {/* Background Illustrations */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10 dark:opacity-5">
        <svg className="absolute top-0 left-0 h-64 w-64 text-green-600 dark:text-green-800" fill="currentColor" viewBox="0 0 100 100">
          <path d="M95,50 Q100,75 75,95 Q50,100 25,75 Q0,50 25,25 Q50,0 75,5 Q100,25 95,50 Z" />
        </svg>
        <svg className="absolute bottom-0 right-0 h-64 w-64 text-green-600 dark:text-green-800" fill="currentColor" viewBox="0 0 100 100">
          <path d="M5,50 Q0,25 25,5 Q50,0 75,25 Q100,50 75,75 Q50,100 25,95 Q0,75 5,50 Z" />
        </svg>
        <svg className="absolute top-1/2 left-1/4 h-32 w-32 text-teal-400 dark:text-teal-600" fill="currentColor" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" />
        </svg>
        <svg className="absolute bottom-1/4 right-1/3 h-48 w-48 text-green-400 dark:text-green-700" fill="currentColor" viewBox="0 0 100 100">
          <path d="M50,0 Q75,25 100,50 Q75,75 50,100 Q25,75 0,50 Q25,25 50,0 Z" />
        </svg>
      </div>
    </div>
  )
}
