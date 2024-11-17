
import prisma from '@/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse } from 'next/server';

// PUT route to edit an item in the cart
export async function PUT(req: Request, { params }: { params: { cartId: string; itemId: string } }) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const { cartId, itemId } = params; // Get cartId and itemId from params
    const { name, qty, unit } = await req.json();

    // Check if the item belongs to the specified cart
    const item = await prisma.cartItem.findUnique({
      where: { id: itemId },
      include: { cart: true },
    });

    if (!item || item.cartId !== cartId) {
      return NextResponse.json({ error: 'Item not found in the specified cart' }, { status: 404 });
    }

    const updatedItem = await prisma.cartItem.update({
      where: { id: itemId },
      data: { name, qty, unit },
    });

    return NextResponse.json(updatedItem, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to edit item' }, { status: 500 });
  }
}
// DELETE route to remove an item from the cart
export async function DELETE(req: Request, { params }: { params: { cartId: string; itemId: string } }) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const { cartId, itemId } = params; // Get cartId and itemId from params

    // Check if the item belongs to the specified cart
    const item = await prisma.cartItem.findUnique({
      where: { id: itemId },
      include: { cart: true },
    });

    if (!item || item.cartId !== cartId) {
      return NextResponse.json({ error: 'Item not found in the specified cart' }, { status: 404 });
    }

    const deletedItem = await prisma.cartItem.delete({
      where: { id: itemId },
    });

    return NextResponse.json(deletedItem, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}
