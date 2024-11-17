import prisma from '@/lib/prisma'
import { FC } from 'react'
import MyCarts from './MyCarts'
import { addCart,  } from './actions'
import { getCurrentUser } from '@/lib/server_utils'

interface pageProps {
  
}

const page: FC<pageProps> = async({}) => {
  const handleAddCart = async(cartName:string)=>{
    "use server"
    await addCart(cartName)
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
  return <MyCarts  carts = {carts} addCart={handleAddCart} contributions = {contributions}/>
}

export default page