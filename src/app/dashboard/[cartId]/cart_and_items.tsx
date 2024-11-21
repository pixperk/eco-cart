'use client'

import { useEffect, useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Cart, CartItem, User } from '@prisma/client'
import { Leaf, PlusCircle, ShoppingCart, Trash2, UserPlus, Users, Sparkles, X, Loader2 } from 'lucide-react'
import { pusherClient } from '@/lib/pusher'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

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
  addItem: (name: string, qty: number, unit: string, cartId: string) => Promise<void>
  deleteItem: (itemId: string) => Promise<void>
  addContributor: (email: string, cartId: string) => Promise<void>
  getAIRecommendation: (itemId: string) => Promise<string>
}

export default function CartPage({ cart, items, contributors, addItem, deleteItem, addContributor, getAIRecommendation }: CartPageProps) {
  const [newItem, setNewItem] = useState({ name: '', qty: '', unit: '' })
  const [contributorEmail, setContributorEmail] = useState('')
  const [itemToDelete, setItemToDelete] = useState<CartItem | null>(null)
  const [loadingRecommendation, setLoadingRecommendation] = useState<string | null>(null)
  const [recommendation, setRecommendation] = useState<{ itemId: string, text: string } | null>(null)
  const [activeTab, setActiveTab] = useState('items')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isAddingItem, setIsAddingItem] = useState(false)
  const [isAddingContributor, setIsAddingContributor] = useState(false)
  const [isContributorDialogOpen, setIsContributorDialogOpen] = useState(false)

  const router = useRouter();

  useEffect(() => {
    pusherClient.subscribe(`cart_${cart.id}_items`);
    const itemHandler = () => {
      router.refresh()
    };
    pusherClient.bind(`items`, itemHandler);
    return () => {
      pusherClient.unsubscribe(`user_${cart.id}_invites`);
      pusherClient.unbind(`items`, itemHandler);
    };
  }, [cart.id]);

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newItem.name && newItem.qty && newItem.unit) {
      setIsAddingItem(true)
      try {
        await addItem(newItem.name, Number(newItem.qty), newItem.unit, cart.id)
        setNewItem({ name: '', qty: '', unit: '' })
        setActiveTab('items')
        toast.success('Item added successfully!')
      } catch (error) {
        console.error('Error adding item:', error)
        toast.error('Failed to add item. Please try again.')
      } finally {
        setIsAddingItem(false)
      }
    }
  }

  const handleAddContributor = async (e: React.FormEvent) => {
    e.preventDefault()
    if (contributorEmail) {
      setIsAddingContributor(true)
      try {
        await addContributor(contributorEmail, cart.id)
        setContributorEmail('')
        setIsContributorDialogOpen(false)
        toast.success('Contributor invited successfully!')
      } catch (error : unknown) {
        console.error('Error inviting contributor:', error)
        toast.error(error instanceof Error ? error.message :'Failed to invite contributor. Please try again.')
      } finally {
        setIsAddingContributor(false)
      }
    }
  }

  const handleAIRecommendation = async (itemId: string) => {
    setLoadingRecommendation(itemId)
    try {
      const result = await getAIRecommendation(itemId)
      setRecommendation({ itemId, text: result })
    } catch (error) {
      console.error('Error getting AI recommendation:', error)
      toast.error('Failed to get AI recommendation. Please try again.')
    } finally {
      setLoadingRecommendation(null)
    }
  }

  const handleDeleteItem = async () => {
    if (itemToDelete) {
      setIsDeleting(true)
      try {
        await deleteItem(itemToDelete.id)
        toast.success('Item deleted successfully!')
      } catch (error) {
        console.error('Error deleting item:', error)
        toast.error('Failed to delete item. Please try again.')
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
                            <Leaf className="h-5 w-5 text-green-600 dark:text-green-400" />
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
                                  onClick={() => handleAIRecommendation(item.id)}
                                  disabled={loadingRecommendation === item.id}
                                >
                                  {loadingRecommendation === item.id ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
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
                                    <Loader2 className="h-4 w-4 animate-spin" />
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
                    <Input
                      id="itemUnit"
                      value={newItem.unit}
                      onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                      placeholder="Enter unit (e.g., kg, g, l)"
                      className="border-green-300 focus:ring-green-500"
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={isAddingItem}>
                  {isAddingItem ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <PlusCircle className="mr-2 h-4 w-4" />
                  )}
                  {isAddingItem ? 'Adding Item...' : 'Add Item'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6">
            <Dialog open={isContributorDialogOpen} onOpenChange={setIsContributorDialogOpen}>
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
                    <Label htmlFor="contributorEmail">Contributor&apos;s Email</Label>
                    <Input
                      id="contributorEmail"
                      type="email"
                      value={contributorEmail}
                      onChange={(e) => setContributorEmail(e.target.value)}
                      placeholder="Enter email address"
                      className="border-green-300 focus:ring-green-500"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white"
                    disabled={isAddingContributor}>
                    {isAddingContributor ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <UserPlus className="mr-2 h-4 w-4" />
                    )}
                    {isAddingContributor ? 'Sending Invitation...' : 'Send Invitation'}
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