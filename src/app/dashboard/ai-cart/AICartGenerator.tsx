'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, Loader2 } from 'lucide-react'

interface GenerateAICartProps {
  genCart: (desc: string) => Promise<void>
}

export default function GenerateAICart({ genCart }: GenerateAICartProps) {
  const [description, setDescription] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const router = useRouter()

  const handleGenerate = async () => {
    if (!description.trim()) return

    setIsGenerating(true)
    try {
      await genCart(description)
      setDescription('')
      router.push('/dashboard')
    } catch (error) {
      console.error('Failed to generate cart:', error)
      // Here you might want to show an error message to the user
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-3xl font-bold text-green-800 dark:text-green-200 mb-6 flex items-center">
        <Sparkles className="mr-2 h-6 w-6" />
        Generate AI Cart
      </h1>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-green-700 dark:text-green-300">
                Shopping Description
              </Label>
              <Input
                id="description"
                placeholder="E.g., Weekly groceries for a family of four"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isGenerating}
                className="border-green-300 focus:ring-green-500 focus:border-green-500 dark:border-green-700 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !description.trim()}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating your eco-friendly cart...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate AI Cart
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}