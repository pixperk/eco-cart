'use client'

import React from 'react'
import { Edit2, Trash2, Sparkles, Leaf } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ShoppingItem } from '../types'
import { Badge } from "@/components/ui/badge"

interface ItemsListProps {
  items: ShoppingItem[];
  onEdit: (item: ShoppingItem) => void;
  onDelete: (id: number) => void;
  onRecommend: (item: ShoppingItem) => void;
}

export const ItemsList: React.FC<ItemsListProps> = ({ 
  items, 
  onEdit, 
  onDelete, 
  onRecommend 
}) => {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-3 bg-green-100 dark:bg-gray-700 rounded hover:bg-green-200 dark:hover:bg-gray-600 transition-colors">
          <div className="flex flex-col mb-2 md:mb-0">
            <div className="flex items-center">
              <span className="font-medium">{item.name}</span>
              <Badge variant="secondary" className="ml-2">
                {item.quantity} {item.unit}
              </Badge>
              {item.ecoScore && (
                <Badge variant="outline" className="ml-2 bg-green-200 dark:bg-green-900">
                  <Leaf className="h-3 w-3 mr-1" />
                  {item.ecoScore}/10
                </Badge>
              )}
            </div>
            {item.tags && item.tags.length > 0 && (
              <div className="flex gap-1 mt-1">
                {item.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onRecommend(item)}
              className="hover:bg-green-200 dark:hover:bg-green-900"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onEdit(item)}
              className="hover:bg-blue-200 dark:hover:bg-blue-900"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onDelete(item.id)}
              className="hover:bg-red-200 dark:hover:bg-red-900"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </li>
      ))}
    </ul>
  )
}