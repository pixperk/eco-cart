"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound, redirect } from "next/navigation";
import prisma from "./prisma";


export async function getCurrentUser() {
    const { getUser } = getKindeServerSession();
    const kindeUser = await getUser();
  
    if (!kindeUser) {
      return notFound()
    }
  
    const user = await prisma.user.findFirst({
      where: { kindeId: kindeUser.id },
    });
  
    if (!user) {
      redirect("/api/auth/success/")
    }
  
    return user;
  }