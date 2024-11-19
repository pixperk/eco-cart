"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "./prisma";
import { redirect } from "next/navigation";

export async function getCurrentUser() {
    const { getUser } = getKindeServerSession();
    const kindeUser = await getUser();
  
    if (!kindeUser) {
      redirect("/");
    }
  
    const user = await prisma.user.findFirst({
      where: { kindeId: kindeUser.id },
    });
  
    if (!user) {
      redirect("/");
    }
  
    return user;
  }