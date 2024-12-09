"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "./prisma";


export async function getCurrentUser() {
    const { getUser } = getKindeServerSession();
    const kindeUser = await getUser();
  
    if (!kindeUser) {
      throw new Error("Unauthorized");
    }
  
    const user = await prisma.user.findFirst({
      where: { kindeId: kindeUser.id },
    });
  
    if (!user) {
      throw new Error("Unauthorized");
    }
  
    return user;
  }