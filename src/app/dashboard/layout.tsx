import Sidebar from '@/components/Sidebar';
import { FC, ReactNode } from 'react';

import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/server_utils';


interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = async({ children }) => {
  const user = await getCurrentUser()

  const invites = await prisma.invite.findMany({
    where: {invitedUserId : user.id},
  })
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar user={user} invites={invites} />
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
