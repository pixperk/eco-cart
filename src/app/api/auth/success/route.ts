
import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";



export async function GET() {
    try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();
        
        if (!user || !user.id) {
            throw new Error("User authentication failed.");
        }

        let dbUser = await prisma.user.findUnique({
            where: { kindeId: user.id }
        });

        if (!dbUser) {
            dbUser = await prisma.user.create({
                data: {
                    kindeId: user.id,
                    firstName: user.given_name || "FirstName",
                    lastName: user.family_name || "LastName",
                    email: user.email || "noemail@domain.com",
                    picture : user.picture || ""

                }
            });
        }

        return new NextResponse("Success");

    } catch (error) {
        console.error("Error processing user:", error);
        return new NextResponse("User processing failed", { status: 500 });
    }
}
