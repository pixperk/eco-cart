
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";



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