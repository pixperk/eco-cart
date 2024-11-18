"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Cart, User } from "@prisma/client";
import { ShoppingCart, UserPlus, Check, X, Loader2 } from 'lucide-react';
import { pusherClient } from "@/lib/pusher";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Invite {
  id: string;
  invitedById: string;
  invitedUserId: string;
  cartUser: {
    user: User;
    cart: Cart;
  };
}

interface InvitesProps {
  userId: string;
  invites: Invite[];
  handleAccept: (inviteId: string) => Promise<void>;
  handleReject: (inviteId: string) => Promise<void>;
}

export default function Component({
  userId,
  invites,
  handleAccept,
  handleReject,
}: InvitesProps) {
  const [pendingInvites, setPendingInvites] = useState(invites);
  const [loadingInvites, setLoadingInvites] = useState<{ [key: string]: boolean }>({});

  const router = useRouter()

  useEffect(() => {
    pusherClient.subscribe(`user_${userId}_invites`);
    const inviteHandler = ({ inviteId }: { inviteId: string; senderName: string }) => {
      router.refresh()
    };
    pusherClient.bind(`invites`, inviteHandler);
    return () => {
      pusherClient.unsubscribe(`user_${userId}_invites`);
      pusherClient.unbind(`invites`, inviteHandler);
    };
  }, [userId, pendingInvites]);

  const handleAcceptClick = async (inviteId: string) => {
    setLoadingInvites((prev) => ({ ...prev, [inviteId]: true }));
    try {
      await handleAccept(inviteId);
      setPendingInvites(
        pendingInvites.filter((invite) => invite.id !== inviteId)
      );
      toast.success("Invite accepted successfully!");
    } catch (error) {
      toast.error("Failed to accept invite. Please try again.");
    } finally {
      setLoadingInvites((prev) => ({ ...prev, [inviteId]: false }));
    }
  };

  const handleRejectClick = async (inviteId: string) => {
    setLoadingInvites((prev) => ({ ...prev, [inviteId]: true }));
    try {
      await handleReject(inviteId);
      setPendingInvites(
        pendingInvites.filter((invite) => invite.id !== inviteId)
      );
      toast.success("Invite rejected successfully!");
    } catch (error) {
      toast.error("Failed to reject invite. Please try again.");
    } finally {
      setLoadingInvites((prev) => ({ ...prev, [inviteId]: false }));
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-green-800 dark:text-green-200 flex items-center justify-center">
          <UserPlus className="mr-2" />
          EcoCart Invites
        </h1>
        <p className="text-green-600 dark:text-green-400 mt-2">
          Manage your pending cart invitations
        </p>
      </div>

      {pendingInvites.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCart className="mx-auto h-12 w-12 text-green-500 mb-4" />
          <p className="text-xl text-green-800 dark:text-green-200">
            No pending invites. You're all caught up!
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pendingInvites.map((invite) => (
            <div
              key={invite.id}
              className="border border-green-200 dark:border-green-800 rounded-lg p-4 bg-white dark:bg-gray-800 flex flex-col"
            >
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-green-800 dark:text-green-200 flex items-center">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {invite.cartUser.cart.name}
                </h2>
                <p className="text-sm text-green-600 dark:text-green-300">
                  You've been invited to join this cart
                </p>
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="h-12 w-12 border-2 border-green-500">
                  <AvatarImage
                    src={invite.cartUser.user.picture}
                    alt={invite.cartUser.user.firstName}
                  />
                  <AvatarFallback className="text-green-800 bg-green-100">
                    {invite.cartUser.user.firstName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">
                    {invite.cartUser.user.firstName}{" "}
                    {invite.cartUser.user.lastName}
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Invited you
                  </p>
                </div>
              </div>
              <div className="flex justify-between mt-auto pt-4 border-t border-green-200 dark:border-green-700">
                <Button
                  variant="outline"
                  onClick={() => handleRejectClick(invite.id)}
                  disabled={loadingInvites[invite.id]}
                  className="border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                >
                  {loadingInvites[invite.id] ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <X className="mr-2 h-4 w-4" />
                  )}
                  Reject
                </Button>
                <Button
                  onClick={() => handleAcceptClick(invite.id)}
                  disabled={loadingInvites[invite.id]}
                  className="bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-800"
                >
                  {loadingInvites[invite.id] ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="mr-2 h-4 w-4" />
                  )}
                  Accept
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}