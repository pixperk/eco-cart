import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 dark:bg-green-900">
      <div className="text-center p-8 bg-white dark:bg-green-800 rounded-lg shadow-md">
        <Loader2 className="w-12 h-12 animate-spin text-green-600 dark:text-green-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-2">Hang tight!</h1>
        <p className="text-green-600 dark:text-green-400">We're setting things up for you...</p>
      </div>
    </div>
  )
}

