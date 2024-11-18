'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

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
      toast.success('New cart generated successfully')
    } catch (error) {
      toast.error('Failed to generate the cart. Try again later')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-green-800 dark:text-green-200 flex items-center justify-center">
          <Sparkles className="mr-2" />
          Generate AI Cart
        </h1>
        <p className="text-green-600 dark:text-green-400 mt-2">
          Create an eco-friendly shopping cart with AI assistance
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        <Textarea
          placeholder="Describe your shopping needs (e.g., Weekly groceries for a family of four)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="min-h-[100px] border-green-300 focus:ring-green-500 dark:border-green-700 dark:focus:ring-green-600"
          disabled={isGenerating}
        />
        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !description.trim()}
          className="w-full bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-800"
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
  )
}