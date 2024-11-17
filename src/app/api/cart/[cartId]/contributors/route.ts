
import prisma from '@/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse } from 'next/server';


export async function POST(req: Request, { params }: { params: { cartId: string } }) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const { cartId } = params; 
    const { userId, role } = await req.json();

    const newContributor = await prisma.cartUser.create({
      data: {
        user: { connect: { id: userId } },
        cart: { connect: { id: cartId } },
        role,
      },
    });

    return NextResponse.json(newContributor, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add contributor' }, { status: 500 });
  }
}
