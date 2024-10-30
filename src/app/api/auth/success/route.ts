import { PrismaClient } from "@prisma/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();
        
        if (!user?.id) {
            throw new Error("User authentication failed.");
        }

        // Check if user exists; if not, create a new user
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
                }
            });
        }

        return NextResponse.redirect("http://localhost:3000/dashboard");

    } catch (error) {
        console.error("Error processing user:", error);
        return new NextResponse("User processing failed", { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
