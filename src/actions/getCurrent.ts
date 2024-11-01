'use server'

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function getCurrentUser(){
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if(!user) throw new Error("No user found");
    const userDetails = {
      name :  `${user.given_name} ${user.family_name}`,
      email : user.email!,
      image : user.picture!
    }

    return userDetails;
}