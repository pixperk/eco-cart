import prisma from '@/lib/prisma'
import { FC } from 'react'
import MyCarts from './MyCarts'
import { addCart, deleteCart } from './actions'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Page: FC = async () => {
  const handleAddCart = async (cartName: string) => {
    "use server"
    await addCart(cartName)
  }

  const handleDeleteCart = async (cartId: string) => {
    "use server"
    await deleteCart(cartId)
  }

  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();

  if(!kindeUser){
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome to My Carts</h1>
        <p className="text-xl mb-8 text-gray-600">Please log in to access your carts.</p>
        <Link href="/api/auth/login">
          <Button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
            Log In
          </Button>
        </Link>
      </div>
    )
  }

  const user = await prisma.user.findFirst({
    where: { kindeId: kindeUser.id },
  });
  
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome to My Carts</h1>
        <p className="text-xl mb-8 text-gray-600">Please log in to access your carts.</p>
        <Link href="/api/auth/login">
          <Button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
            Log In
          </Button>
        </Link>
      </div>
    )
  }

  const carts = await prisma.cart.findMany({
    where: { mainUserId: user.id },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const contributions = await prisma.cartUser.findMany({
    where: {
      userId: user.id,
      role: "CONTRIBUTOR"
    },
    include: {
      cart: true
    },
    orderBy: {
      cart: {
        createdAt: 'desc'
      }
    }
  })

  return <MyCarts carts={carts} addCart={handleAddCart} deleteCart={handleDeleteCart} contributions={contributions} />
}

export default Page

