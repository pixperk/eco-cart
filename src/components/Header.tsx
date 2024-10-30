import { List, Sparkles } from 'lucide-react'

export const Header = () => {
  return (
    <header className="text-center py-4 px-4">
      <h1 className="text-4xl sm:text-5xl font-bold text-green-800 dark:text-green-200 mb-4">
        Smart, Sustainable Shopping with EcoCart
      </h1>
      <p className="text-xl text-green-700 dark:text-green-300 mb-8">
        Eco-friendly, AI-powered recommendations for conscious shopping
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center justify-center hover:bg-green-700 transition-colors">
          <List className="mr-2" />
          Create Custom List
        </button>
        <button className="bg-teal-500 text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center justify-center hover:bg-teal-600 transition-colors">
          <Sparkles className="mr-2" />
          Make AI Do It All
        </button>
      </div>
    </header>
  )
}