'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Cart, User } from '@prisma/client'
import { ShoppingCart, UserPlus, Check, X } from 'lucide-react'

interface Invite {
    id: string;
    invitedById: string;
    invitedUserId: string;
    cartUser: {
        user: User,
        cart: Cart
    }
}

interface InvitesProps {
  invites: Invite[]
  handleAccept: (inviteId: string) => Promise<void>
  handleReject: (inviteId: string) => Promise<void>
}

export default function Invites({ invites, handleAccept, handleReject }: InvitesProps) {
  const [pendingInvites, setPendingInvites] = useState(invites)

  const handleAcceptClick = async (inviteId: string) => {
    await handleAccept(inviteId)
    setPendingInvites(pendingInvites.filter(invite => invite.id !== inviteId))
  }

  const handleRejectClick = async (inviteId: string) => {
    await handleReject(inviteId)
    setPendingInvites(pendingInvites.filter(invite => invite.id !== inviteId))
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-green-800 dark:text-green-200">EcoCart Invites</h1>
        </div>
        {pendingInvites.length === 0 ? (
          <div className="text-center py-12">
            <UserPlus className="mx-auto h-12 w-12 text-green-500 mb-4" />
            <p className="text-xl text-green-800 dark:text-green-200">No pending invites. You're all caught up!</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pendingInvites.map((invite) => (
              <Card key={invite.id} className="flex flex-col border-green-200 dark:border-green-800 overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-800 dark:text-green-200">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    {invite.cartUser.cart.name}
                  </CardTitle>
                  <CardDescription className="text-green-600 dark:text-green-300">
                    You've been invited to join this cart
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12 border-2 border-green-500">
                      <AvatarImage src={invite.cartUser.user.picture} alt={invite.cartUser.user.firstName} />
                      <AvatarFallback className="text-green-800 bg-green-100">
                        {invite.cartUser.user.firstName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-green-800 dark:text-green-200">
                        {invite.cartUser.user.firstName} {invite.cartUser.user.lastName}
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400">Invited you</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between mt-auto pt-4 border-t border-green-200 dark:border-green-700">
                  <Button 
                    variant="outline" 
                    onClick={() => handleRejectClick(invite.id)}
                    className="border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                  >
                    <X className="mr-2 h-4 w-4" /> Reject
                  </Button>
                  <Button 
                    onClick={() => handleAcceptClick(invite.id)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Check className="mr-2 h-4 w-4" /> Accept
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}