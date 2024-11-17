import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai"
import { getCurrentUser } from "@/lib/server_utils";
import { revalidatePath } from "next/cache";




async function getCart(cartId: string, userId: string) {
  const cart = await prisma.cart.findUnique({
    where: { id: cartId },
    include : {
      contributors : true
    }
  });

  if (!cart) {
    throw new Error("Unauthorized action");
  }

  const isContributor = cart.contributors.find(contri => contri.userId == userId)

  if(!isContributor)  throw new Error("Unauthorized action");

  return cart;
}

export async function addCart(name: string) {
  const user = await getCurrentUser();
  const cart = await prisma.cart.create({
    data: {
      name,
      mainUserId: user.id,
    },
  });

await prisma.cartUser.create({
  data : {
    userId : user.id,
    cartId : cart.id,
    role : "MAIN"
  }
})
}

export async function deleteCart(cartId: string) {
  const user = await getCurrentUser();

  const cart = await prisma.cart.findFirst({
    where: {
      id: cartId,
      mainUserId: user.id, 
    },
  });

  if (!cart) {
    throw new Error("Cart not found or you do not have permission to delete it.");
  }

 
  await prisma.cartUser.deleteMany({
    where: { cartId },
  });

  await prisma.cartItem.deleteMany({
    where: { cartId },
  });

  await prisma.cart.delete({
    where: { id: cartId },
  });

  revalidatePath('/dashboard');
}


export async function addItem(
  name: string,
  qty: number,
  unit: string,
  cartId: string
) {
  const user = await getCurrentUser();
  await getCart(cartId, user.id);

  await prisma.cartItem.create({
    data: {
      name,
      qty,
      unit,
      cartId,
    },
  });
}

export async function deleteItem(itemId: string) {
  const user = await getCurrentUser();

  const cartItem = await prisma.cartItem.findUnique({
    where: { id: itemId },
  });

  if (!cartItem) {
    throw new Error("Invalid item");
  }

  await getCart(cartItem.cartId, user.id);

  await prisma.cartItem.delete({
    where: { id: itemId },
  });
}

export async function addContributor(userEmail: string, cartId: string) {
  const user = await getCurrentUser();
  await getCart(cartId, user.id);

  const contributor = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  if (!contributor) throw new Error("User does not exist");

  const cartuser = await prisma.cartUser.findUnique({
    where: {
      userId_cartId: {
        userId: user.id,
        cartId,
      },
    },
  });

  if (!cartuser) throw new Error("No such cart exists");

  const invite = await prisma.invite.findFirst({
    where: {
      invitedById: cartuser.id,
      invitedUserId: contributor.id,
    },
  });

  const inCart = await prisma.cartUser.findUnique({
    where: {
      userId_cartId: {
        userId: contributor.id,
        cartId,
      },
    },
  });

  if (invite) throw new Error("Already Invited");
  if (inCart) throw new Error("User already a contributor");

  await prisma.invite.create({
    data: {
      invitedById: cartuser.id,
      invitedUserId: contributor.id,
    },
  });
}


export async function acceptInvite(inviteId : string){
  const user = await getCurrentUser();
  const invite = await prisma.invite.findUnique({
    where : {
      id : inviteId,
      invitedUserId : user.id
    },
    include : {
      cartUser : true
    }

  })

  if(!invite || invite.invitedUserId!=user.id)throw new Error("Invalid Invite")

  await prisma.cartUser.create({
    data:{
      userId : user.id,
      cartId : invite.cartUser.cartId,
      role : "CONTRIBUTOR"
    }
  })

  await prisma.invite.delete({
    where:{
      id : inviteId,
      invitedUserId : user.id
    }
  })
}

export async function rejectInvite(inviteId : string){
  const user = await getCurrentUser();
  const invite = await prisma.invite.findUnique({
    where : {
      id : inviteId,
      invitedUserId : user.id
    },

  })

  if(!invite || invite.invitedUserId!=user.id)throw new Error("Invalid Invite")

    await prisma.invite.delete({
      where:{
        id : inviteId,
        invitedUserId : user.id
      }
    })
}

export async function generateAIRecommendation(itemId : string){
  const user = await getCurrentUser();

  const cartItem = await prisma.cartItem.findUnique({
    where: { id: itemId },
  });

  if (!cartItem) {
    throw new Error("Invalid item");
  }

  await getCart(cartItem.cartId, user.id);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const prompt = `Generate eco-friendly recommendations and alternatives for the shopping of this item(not more than 60 words) : ${cartItem.name}`

const result = await model.generateContent(prompt);
return result.response.text()


}