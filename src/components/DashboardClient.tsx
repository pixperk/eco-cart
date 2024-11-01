'use client'

import React, { useState } from 'react'
import type { ShoppingList, ShoppingItem, AiRecommendation } from '../types'
import { AddItemDialog } from './AddItemDialog'
import Sidebar from './Sidebar'
import { DashboardActions } from './DashboardActions'
import { ItemsList } from './ItemList'

interface ShoppingListClientProps {
  initialData: {
    lists: ShoppingList[];
    items: ShoppingItem[];
  }
}

export default function ShoppingListClient({ initialData }: ShoppingListClientProps) {
  // Initialize state with server-provided data
  const [currentList, setCurrentList] = useState<ShoppingList>(initialData.lists[0])
  const [items, setItems] = useState<ShoppingItem[]>(initialData.items)
  const [recommendations, setRecommendations] = useState<AiRecommendation[]>([])

  const handleAddItem = (newItem: Omit<ShoppingItem, 'id'>) => {
    const id = Math.max(0, ...items.map(item => item.id)) + 1
    setItems(prevItems => [...prevItems, { ...newItem, id }])
  }

  const handleEditItem = (editedItem: ShoppingItem) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === editedItem.id ? editedItem : item
      )
    )
  }

  const handleDeleteItem = (id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id))
  }

  const handleListChange = (listId: number) => {
    const newList = initialData.lists.find(list => list.id === listId)
    if (newList) {
      setCurrentList(newList)
      // In a real app, you'd fetch items for the new list here
    }
  }

  const handleGetRecommendation = (item: ShoppingItem) => {
    const recommendation: AiRecommendation = {
      item,
      recommendation: `Consider buying ${item.name} in bulk to reduce packaging waste.`
    }
    setRecommendations(prev => [...prev, recommendation])
  }

  const handleInviteCollaborator = async (email: string) => {
    console.log(`Invitation sent to ${email}`)
  }

  return (
    <div className="flex min-h-screen bg-green-50 dark:bg-gray-900">
      <Sidebar 
        currentList={currentList}
        lists={initialData.lists}
        onListChange={handleListChange}
      />
      
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {currentList.name}
            </h1>
            <AddItemDialog onAddItem={handleAddItem} />
          </div>

          <div className="mb-8">
            <DashboardActions 
              onInviteCollaborator={handleInviteCollaborator} 
            />
          </div>

          {recommendations.length > 0 && (
            <div className="mb-8 p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Smart Recommendations</h2>
              <ul className="space-y-2">
                {recommendations.map((rec, index) => (
                  <li key={index} className="p-3 bg-white dark:bg-gray-800 rounded">
                    <span className="font-medium">{rec.item.name}:</span>{' '}
                    {rec.recommendation}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Items</h2>
            {items.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No items yet. Add some items to get started!
              </p>
            ) : (
              <ItemsList
                items={items}
                onEdit={handleEditItem}
                onDelete={handleDeleteItem}
                onRecommend={handleGetRecommendation}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}