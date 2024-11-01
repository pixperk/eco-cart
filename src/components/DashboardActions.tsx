'use client'

import React from 'react'
import { MessageSquare, UserPlus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface DashboardActionsProps {
  onInviteCollaborator: (email: string) => void;
}

export const DashboardActions: React.FC<DashboardActionsProps> = ({ onInviteCollaborator }) => {
  const [collaboratorEmail, setCollaboratorEmail] = React.useState('')

  const handleInvite = () => {
    onInviteCollaborator(collaboratorEmail)
    setCollaboratorEmail('')
  }

  return (
    <div className="grid md:grid-cols-2 gap-4 md:gap-8">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white">
            <MessageSquare className="mr-2 h-4 w-4" /> Get Smart Recommendations
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Smart Shopping Assistant</DialogTitle>
            <DialogDescription>Get personalized eco-friendly shopping advice.</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Seasonal Recommendations</h4>
              <p className="text-sm">Based on current season and local availability.</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Carbon Footprint Tips</h4>
              <p className="text-sm">Ways to reduce your shopping's environmental impact.</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Budget-Friendly Options</h4>
              <p className="text-sm">Eco-friendly alternatives within your budget.</p>
            </div>
          </div>
          <DialogFooter>
            <Button type="button">Generate Recommendations</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
            <UserPlus className="mr-2 h-4 w-4" /> Invite Collaborator
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Invite Collaborator</DialogTitle>
            <DialogDescription>Enter the email of the person you want to collaborate with.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="collaborator-email" className="text-right">Email</Label>
              <Input
                id="collaborator-email"
                type="email"
                value={collaboratorEmail}
                onChange={(e) => setCollaboratorEmail(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleInvite}>Send Invite</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}