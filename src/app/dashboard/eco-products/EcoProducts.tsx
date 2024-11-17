'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, ShoppingCart, Leaf } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ItemToBeAdded } from '@/types'

interface CartType { 
  cart: {
    id: string
    createdAt: Date
    updatedAt: Date
    name: string
    mainUserId: string
  }
}

interface EcoProductsProps {
  generateItems: (desc: string) => Promise<ItemToBeAdded[]>
  carts: CartType[]
  addToCart: (name: string, qty: number, unit: string, cartId: string) => Promise<void>
}

export default function EcoProducts({ generateItems, carts, addToCart }: EcoProductsProps) {
  const [description, setDescription] = useState('')
  const [generatedItems, setGeneratedItems] = useState<ItemToBeAdded[]>([])
  const [selectedCart, setSelectedCart] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState<string | null>(null)

  const handleGenerateItems = async () => {
    setIsLoading(true)
    try {
      const items = await generateItems(description)
      setGeneratedItems(items)
    } catch (error) {
      console.error('Error generating items:', error)
    }
    setIsLoading(false)
  }

  const handleAddToCart = async (item: ItemToBeAdded) => {
    if (!selectedCart) {
      alert('Please select a cart first')
      return
    }
    setIsAddingToCart(item.itemName)
    try {
      await addToCart(item.itemName, item.qty, item.unit, selectedCart)
      alert('Product added to cart successfully')
    } catch (error) {
      console.error('Error adding product to cart:', error)
      alert('Failed to add product to cart')
    }
    setIsAddingToCart(null)
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-green-800 dark:text-green-200 flex items-center justify-center">
          <Leaf className="mr-2" />
          Eco-Friendly Product Generator
        </h1>
        <p className="text-green-600 dark:text-green-400 mt-2">
          Generate eco-friendly alternatives for your shopping list
        </p>
      </div>

      <div className="space-y-4">
        <Textarea
          placeholder="Describe the products you're looking for eco-friendly alternatives to..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="min-h-[100px] border-green-300 focus:ring-green-500 dark:border-green-700 dark:focus:ring-green-600"
        />
        <div className="flex justify-between items-center">
          <Button
            onClick={handleGenerateItems}
            disabled={isLoading || !description.trim()}
            className="bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-800"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Eco Products'
            )}
          </Button>
          <Select value={selectedCart} onValueChange={setSelectedCart}>
            <SelectTrigger className="w-[200px] border-green-300 focus:ring-green-500 dark:border-green-700 dark:focus:ring-green-600">
              <SelectValue placeholder="Select a cart" />
            </SelectTrigger>
            <SelectContent>
              {carts.map((cart) => (
                <SelectItem key={cart.cart.id} value={cart.cart.id}>
                  {cart.cart.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <ScrollArea className="h-[400px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {generatedItems.map((item, index) => (
            <div key={index} className="border border-green-300 dark:border-green-700 rounded-lg p-4 bg-white dark:bg-gray-800">
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">{item.itemName}</h3>
              <p className="text-green-600 dark:text-green-400 mb-4">
                Quantity: {item.qty} {item.unit}
              </p>
              <Button
                onClick={() => handleAddToCart(item)}
                disabled={!selectedCart || isAddingToCart === item.itemName}
                className="w-full bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-800"
              >
                {isAddingToCart === item.itemName ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </>
                )}
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}