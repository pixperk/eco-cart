import prisma from "@/lib/prisma";

/**
 * Get user by Kinde ID.
 */
export async function getUserByKindeId(kindeId: string) {
  return prisma.user.findFirst({
    where: { kindeId },
  });
}

/**
 * Get a cart by user ID and cart ID.
 */
export async function getCartForUser(userId: string, cartId: string) {
  return prisma.cartUser.findFirst({
    where: {
      userId,
      cartId,
    },
    include: {
      cart: {
        include: {
          contributors: {
            include: { user: true },
          },
        },
      },
    },
  });
}

/**
 * Get items in a cart.
 */
export async function getCartItems(cartId: string) {
  return prisma.cartItem.findMany({
    where: { cartId },
    orderBy: { createdAt: "desc" },
  });
}
