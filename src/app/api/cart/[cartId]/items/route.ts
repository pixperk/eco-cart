import prisma from '../../../../../lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse } from 'next/server';

// POST route to add an item to the cart
export async function POST(req: Request, { params }: { params: { cartId: string } }) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const { cartId } = params 
    const { name, qty, unit } = await req.json();
    
    if (!name || qty === undefined || !unit) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const newItem = await prisma.cartItem.create({
      data: {
        name,
        qty,
        unit,
        cart: { connect: { id: cartId as string } },
      },
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add item' }, { status: 500 });
  }
}
