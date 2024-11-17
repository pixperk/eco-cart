import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

// DELETE route to delete a cart by ID
export async function DELETE(req: Request, { params }: { params: { cartId: string } }) {
    try {
      const { getUser } = getKindeServerSession();
      const user = await getUser();
  
      if (!user) {
        return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
      }
  
      const { cartId } = params;
  
      // Check if the user is the main user of the cart
      const cart = await prisma.cart.findUnique({
        where: { id: cartId },
        include: { mainUser: true },
      });
  
      if (!cart || cart.mainUser.kindeId !== user.id) {
        return NextResponse.json({ error: 'Unauthorized action' }, { status: 403 });
      }
  
      await prisma.cart.delete({ where: { id: cartId } });
      return NextResponse.json({ message: 'Cart deleted successfully' }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to delete cart' }, { status: 500 });
    }
  }
  // PUT route to rename a cart
export async function PUT(req: Request, { params }: { params: { cartId: string } }) {
    try {
      const { getUser } = getKindeServerSession();
      const user = await getUser();
  
      if (!user) {
        return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
      }
  
      const { cartId } = params;
      const { newName } = await req.json();
  
      if (!newName) {
        return NextResponse.json({ error: 'New name is required' }, { status: 400 });
      }
  
      // Check if the user is the main user of the cart
      const cart = await prisma.cart.findUnique({
        where: { id: cartId },
        include: { mainUser: true },
      });
  
      if (!cart || cart.mainUser.kindeId !== user.id) {
        return NextResponse.json({ error: 'Unauthorized action' }, { status: 403 });
      }
  
      const updatedCart = await prisma.cart.update({
        where: { id: cartId },
        data: { name: newName },
      });
  
      return NextResponse.json(updatedCart, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to rename cart' }, { status: 500 });
    }
  }
  
  