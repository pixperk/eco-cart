import { FC } from 'react'
import { acceptInvite, rejectInvite } from '../actions'
import prisma from '@/lib/prisma'
import Invites from './invites'
import { getCurrentUser } from '@/lib/server_utils'

interface pageProps {
  
}

const page: FC<pageProps> = async({}) => {

    const user = await getCurrentUser()

    const myInvites = await prisma.invite.findMany({
        where:{
            invitedUserId : user.id
        },
        include : {
            cartUser : {
                include : {
                    user : true,
                    cart : true
                }
            }
        }
    })

  async function handleAccept(inviteId : string){
    "use server"
    await acceptInvite(inviteId)
  }
  async function handleReject(inviteId : string){
    "use server"
    await rejectInvite(inviteId)
  }
  return <Invites invites={myInvites} handleAccept={handleAccept} handleReject={handleReject}/>
}

export default page