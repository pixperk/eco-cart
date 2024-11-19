import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/lib/server_utils'
import { FC } from 'react'
import MyCarts from './MyCarts'
import { addCart, deleteCart, } from './actions'


const page: FC = async({}) => {
  const handleAddCart = async(cartName:string)=>{
    "use server"
    await addCart(cartName)
  }

  const handleDeleteCart = async(cartId : string)=>{
    "use server"
    await deleteCart(cartId)
  }

  const user = await getCurrentUser()

  const carts = await prisma.cart.findMany({
    where: {mainUserId : user.id},
    orderBy : {
      createdAt : 'desc'
    }
  })

  const contributions = await prisma.cartUser.findMany({
    where : {userId : user.id,
      role : "CONTRIBUTOR"
    },
    include :{
      cart : true
    },
    orderBy : {
      cart: {
        createdAt : 'desc'
      }
    }
  })
  return <MyCarts  carts = {carts} addCart={handleAddCart} deleteCart = {handleDeleteCart} contributions = {contributions}/>
}

export default page