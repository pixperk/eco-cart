import prisma from '../../../lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse } from 'next/server';


export async function POST(req: Request) {
  try {
    const { getUser } = getKindeServerSession();
    const kindeUser = await getUser();
    
    const user = await prisma.user.findFirst({
      where:{
        kindeId : kindeUser.id
      }
    })


    if (!user) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const { cartName } = await req.json();
    if (!cartName) {
      return NextResponse.json({ error: 'Cart name is required' }, { status: 400 });
    }

    const newCart = await prisma.cart.create({
      data: {
        name: cartName,
        mainUser: { connect: { id: user.id } },
      },
    });

    return NextResponse.json(newCart, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add cart' }, { status: 500 });
  }
}

