'use client'

import { FC, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Cart, CartUser } from '@prisma/client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Plus, ArrowRight, Users } from 'lucide-react'

interface MyCartsProps {
  carts: Cart[]
  contributions: (CartUser & { cart: Cart })[]
  addCart: (cartName: string) => Promise<void>
}

const MyCarts: FC<MyCartsProps> = ({ carts, contributions, addCart }) => {
  const [newCartName, setNewCartName] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleAddCart = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newCartName.trim()) {
      await addCart(newCartName)
      setNewCartName('')
      setIsOpen(false)
      router.refresh()
    }
  }

  const renderCarts = (cartList: Cart[]) => (
    cartList.length > 0 ? (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cartList.map((cart) => (
          <Card key={cart.id} className="border-green-200 dark:border-green-800">
            <CardHeader className="bg-green-100 dark:bg-green-800">
              <CardTitle className="flex items-center text-green-800 dark:text-green-200">
                <ShoppingCart className="mr-2 h-5 w-5" />
                {cart.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <Button 
                onClick={() => router.push(`/dashboard/${cart.id}`)}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Go to Cart <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    ) : (
      <div className="text-center py-12">
        <ShoppingCart className="mx-auto h-12 w-12 text-green-500 mb-4" />
        <p className="text-xl text-green-800 dark:text-green-200">No carts available in this category.</p>
      </div>
    )
  )

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-800 dark:text-green-200">My Carts</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Plus className="mr-2 h-4 w-4" /> Add New Cart
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Cart</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddCart} className="space-y-4">
              <div>
                <Label htmlFor="cartName">Cart Name</Label>
                <Input
                  id="cartName"
                  value={newCartName}
                  onChange={(e) => setNewCartName(e.target.value)}
                  placeholder="Enter cart name"
                  className="border-green-300 focus:ring-green-500"
                />
              </div>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                Add Cart
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="my-carts" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="my-carts">My Carts</TabsTrigger>
          <TabsTrigger value="contributions">Contributions</TabsTrigger>
        </TabsList>
        <TabsContent value="my-carts">
          {renderCarts(carts)}
        </TabsContent>
        <TabsContent value="contributions">
          {renderCarts(contributions?.map(c => c.cart))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default MyCarts