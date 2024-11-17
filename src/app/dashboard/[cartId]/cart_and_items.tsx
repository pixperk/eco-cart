'use client'

import { useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Cart, CartItem, User } from '@prisma/client'
import { Apple, Carrot, Egg, Fish, Leaf, PlusCircle, ShoppingCart, Trash2, UserPlus, Users, Wheat, Sparkles, X } from 'lucide-react'

type Contributor = {
  id: string;
  cartId: string;
  role: "MAIN" | "CONTRIBUTOR";
  userId: string;
  user: User
}

interface CartPageProps {
  cart: Cart
  items: CartItem[]
  contributors: Contributor[]
  addItem: (name: string, qty: number, unit: string, cartId: string) => void
  deleteItem: (itemId: string) => Promise<void>
  addContributor: (email: string, cartId: string) => void
  getAIRecommendation: (itemId: string) => Promise<string>
}

const predefinedUnits = ['kg', 'g', 'l', 'ml', 'pcs', 'box']

const itemIcons: { [key: string]: React.ReactNode } = {
  Apple: <Apple className="h-5 w-5" />,
  Carrot: <Carrot className="h-5 w-5" />,
  Wheat: <Wheat className="h-5 w-5" />,
  Fish: <Fish className="h-5 w-5" />,
  Egg: <Egg className="h-5 w-5" />,
}

export default function CartPage({ cart, items, contributors, addItem, deleteItem, addContributor, getAIRecommendation }: CartPageProps) {
  const [newItem, setNewItem] = useState({ name: '', qty: '', unit: '' })
  const [contributorEmail, setContributorEmail] = useState('')
  const [itemToDelete, setItemToDelete] = useState<CartItem | null>(null)
  const [customUnit, setCustomUnit] = useState('')
  const [loadingRecommendation, setLoadingRecommendation] = useState<string | null>(null)
  const [recommendation, setRecommendation] = useState<{ itemId: string, text: string } | null>(null)
  const [activeTab, setActiveTab] = useState('items')
  const [isDeleting, setIsDeleting] = useState(false)

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (newItem.name && newItem.qty && (newItem.unit || customUnit)) {
      addItem(newItem.name, Number(newItem.qty), newItem.unit || customUnit, cart.id)
      setNewItem({ name: '', qty: '', unit: '' })
      setCustomUnit('')
      setActiveTab('items')
    }
  }

  const handleAddContributor = (e: React.FormEvent) => {
    e.preventDefault()
    if (contributorEmail) {
      addContributor(contributorEmail, cart.id)
      setContributorEmail('')
    }
  }

  const handleAIRecommendation = async (itemId: string, itemName: string) => {
    setLoadingRecommendation(itemId)
    try {
      const result = await getAIRecommendation(itemId)
      setRecommendation({ itemId, text: result })
    } catch (error) {
      console.error('Error getting AI recommendation:', error)
      setRecommendation({ itemId, text: 'Failed to get recommendation. Please try again.' })
    } finally {
      setLoadingRecommendation(null)
    }
  }

  const handleDeleteItem = async () => {
    if (itemToDelete) {
      setIsDeleting(true)
      try {
        await deleteItem(itemToDelete.id)
      } catch (error) {
        console.error('Error deleting item:', error)
      } finally {
        setIsDeleting(false)
        setItemToDelete(null)
      }
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="border-green-500 dark:border-green-700 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-3xl font-bold flex items-center">
                <ShoppingCart className="mr-2" />
                {cart.name}
              </CardTitle>
              <CardDescription className="text-green-100 mt-2">
                Eco-friendly shopping made easy
              </CardDescription>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white">
                    <Users className="mr-2 h-4 w-4" />
                    <Badge variant="secondary" className="bg-green-700 text-white">
                      {contributors.length}
                    </Badge>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{contributors.length} Contributors</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="items" className="flex items-center justify-center">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Items
              </TabsTrigger>
              <TabsTrigger value="add" className="flex items-center justify-center">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Item
              </TabsTrigger>
            </TabsList>
            <TabsContent value="items">
              <ScrollArea className="h-[400px] pr-4">
                {items.length > 0 ? (
                  <ul className="space-y-4">
                    {items.map((item) => (
                      <li key={item.id} className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/50 rounded-lg shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center">
                          <div className="bg-green-200 dark:bg-green-800 p-2 rounded-full mr-4">
                            {itemIcons[item.name] || <Leaf className="h-5 w-5 text-green-600 dark:text-green-400" />}
                          </div>
                          <div>
                            <span className="font-medium text-green-800 dark:text-green-200">{item.name}</span>
                            <span className="text-sm text-green-600 dark:text-green-400 block">
                              {item.qty} {item.unit}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="text-green-600 hover:text-green-700 border-green-300 hover:border-green-400"
                                  onClick={() => handleAIRecommendation(item.id, item.name)}
                                  disabled={loadingRecommendation === item.id}
                                >
                                  {loadingRecommendation === item.id ? (
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600" />
                                  ) : (
                                    <Sparkles className="h-4 w-4" />
                                  )}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Get AI recommendation</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="icon" className="text-red-500 hover:text-red-600 border-red-300 hover:border-red-400" onClick={() => setItemToDelete(item)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Confirm Deletion</DialogTitle>
                              </DialogHeader>
                              <p>Are you sure you want to delete {itemToDelete?.name}?</p>
                              <div className="flex justify-end space-x-2 mt-4">
                                <Button variant="outline" onClick={() => setItemToDelete(null)}>Cancel</Button>
                                <Button variant="destructive" onClick={handleDeleteItem} disabled={isDeleting}>
                                  {isDeleting ? (
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                                  ) : (
                                    'Delete'
                                  )}
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-8 bg-green-50 dark:bg-green-900/50 rounded-lg">
                    <Leaf className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <p className="text-green-600 dark:text-green-400">
                      No items in the cart yet. Start adding eco-friendly products!
                    </p>
                  </div>
                )}
              </ScrollArea>
              {recommendation && (
                <div className="mt-4 p-4 bg-green-100 dark:bg-green-800 rounded-lg relative">
                  <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                    AI Recommendation for {items.find(item => item.id === recommendation.itemId)?.name}:
                  </h3>
                  <p className="text-green-700 dark:text-green-300">{recommendation.text}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 text-green-600 hover:text-green-700"
                    onClick={() => setRecommendation(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </TabsContent>
            <TabsContent value="add">
              <form onSubmit={handleAddItem} className="space-y-4">
                <div>
                  <Label htmlFor="itemName">Item Name</Label>
                  <Input
                    id="itemName"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    placeholder="Enter item name"
                    className="border-green-300 focus:ring-green-500"
                  />
                </div>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Label htmlFor="itemQty">Quantity</Label>
                    <Input
                      id="itemQty"
                      type="number"
                      value={newItem.qty}
                      onChange={(e) => setNewItem({ ...newItem, qty: e.target.value })}
                      placeholder="Enter quantity"
                      className="border-green-300 focus:ring-green-500"
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="itemUnit">Unit</Label>
                    <Select
                      value={newItem.unit}
                      onValueChange={(value) => setNewItem({ ...newItem, unit: value })}
                    >
                      <SelectTrigger className="border-green-300 focus:ring-green-500">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        {predefinedUnits.map((unit) => (
                          <SelectItem key={unit} value={unit}>
                            {unit}
                          </SelectItem>
                        ))}
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {newItem.unit === 'custom' && (
                  <div>
                    <Label htmlFor="customUnit">Custom Unit</Label>
                    <Input
                      id="customUnit"
                      value={customUnit}
                      onChange={(e) => setCustomUnit(e.target.value)}
                      placeholder="Enter custom unit"
                      className="border-green-300 focus:ring-green-500"
                    />
                  </div>
                )}
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Item
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full border-green-500 text-green-600 hover:bg-green-50 dark:border-green-700 dark:text-green-400 dark:hover:bg-green-900/50">
                  <UserPlus className="mr-2 h-4 w-4" /> Invite Contributor
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Invite Contributor</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddContributor} className="space-y-4">
                  <div>
                    <Label htmlFor="contributorEmail">Contributor's Email</Label>
                    <Input
                      id="contributorEmail"
                      type="email"
                      value={contributorEmail}
                      onChange={(e) => setContributorEmail(e.target.value)}
                      placeholder="Enter email address"
                      className="border-green-300 focus:ring-green-500"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Send Invitation
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}