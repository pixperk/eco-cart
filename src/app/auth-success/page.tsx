'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function AuthSuccessPage() {
  const [status, setStatus] = useState<'loading' | 'redirecting' | 'error'>('loading')
  const router = useRouter()

  useEffect(() => {
    const fetchAuthSuccess = async () => {
      try {
        const response = await fetch('/api/auth/success')
        if (response.ok) {
          setStatus('redirecting')
          router.push('/dashboard')
        } else {
          throw new Error('Failed to process authentication')
        }
      } catch (error) {
        console.error('Error during authentication:', error)
        setStatus('error')
      }
    }

    fetchAuthSuccess()
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 dark:bg-green-900">
      <div className="text-center p-8 bg-white dark:bg-green-800 rounded-lg shadow-md">
        {status === 'loading' && (
          <>
            <Loader2 className="w-12 h-12 animate-spin text-green-600 dark:text-green-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-2">Setting up your account</h1>
            <p className="text-green-600 dark:text-green-400">Please wait while we prepare your dashboard...</p>
          </>
        )}
        {status === 'redirecting' && (
          <>
            <Loader2 className="w-12 h-12 animate-spin text-green-600 dark:text-green-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-2">Account setup complete!</h1>
            <p className="text-green-600 dark:text-green-400">Redirecting you to your dashboard...</p>
          </>
        )}
        {status === 'error' && (
          <>
            <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">Oops! Something went wrong</h1>
            <p className="text-green-600 dark:text-green-400">Please try again or contact support if the issue persists.</p>
          </>
        )}
      </div>
    </div>
  )
}

