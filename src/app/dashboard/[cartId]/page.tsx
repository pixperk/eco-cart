import { Suspense } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import ShoppingListClient from '@/components/DashboardClient'

async function getData() {
  // In a real app, this would fetch from your database
  return {
    lists: [
      { id: 1, name: "Weekly Groceries" },
      { id: 2, name: "Household Essentials" },
      { id: 3, name: "Zero Waste Products" },
    ],
    items: [
      { 
        id: 1, 
        name: "Organic Apples", 
        quantity: 5, 
        unit: "pcs", 
        ecoScore: 9,
        tags: ["organic", "local"]
      },
      { 
        id: 2, 
        name: "Reusable Bags", 
        quantity: 3, 
        unit: "pcs",
        ecoScore: 10,
        tags: ["zero-waste"]
      },
      { 
        id: 3, 
        name: "Bamboo Toothbrush", 
        quantity: 2, 
        unit: "pcs",
        ecoScore: 8,
        tags: ["sustainable", "plastic-free"]
      },
    ]
  }
}

export default async function DashboardPage() {
  const initialData = await getData()
  
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <ShoppingListClient initialData={initialData} />
    </Suspense>
  )
}

function DashboardSkeleton() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-green-50 dark:bg-gray-900">
      <div className="w-64 bg-green-800 dark:bg-gray-900">
        <Skeleton className="h-screen" />
      </div>
      <main className="flex-1 p-8">
        <Skeleton className="h-10 w-48 mb-8" />
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
        </div>
      </main>
    </div>
  )
}