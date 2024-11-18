
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getCurrentUser } from "@/lib/server_utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/prisma";



export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {

  let user;
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();

  if (!kindeUser) {
    user = null
  }

   if(kindeUser) {const dbUser = await prisma.user.findFirst({
    where: { kindeId: kindeUser.id },
  });

  user = dbUser}


  return (
      <>
        <Navbar user={user}/>
        <main className="flex-grow">
          {children}</main>
        <Footer />
        </>
     
  );
}