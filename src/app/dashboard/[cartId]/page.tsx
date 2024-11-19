import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import CartPage from "./cart_and_items";
import { notFound } from "next/navigation";
import { 
  addItem,
  addContributor,
  deleteItem,
  generateAIRecommendation
} from "../actions";
import { revalidatePath } from "next/cache";
import { getCartForUser, getCartItems, getUserByKindeId } from "./actions";

export default async function DashboardPage({
  params,
}: {
  params: { cartId: string };
}) {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();

  if (!kindeUser) {
    return notFound();
  }

  const user = await getUserByKindeId(kindeUser.id);

  if (!user) {
    return notFound();
  }

  const cart = await getCartForUser(user.id, params.cartId);

  if (!cart) {
    return notFound();
  }

  const items = await getCartItems(params.cartId);

  async function handleAddItem(
    name: string,
    qty: number,
    unit: string,
    cartId: string
  ) {
    "use server";
    await addItem(name, qty, unit, cartId);
    revalidatePath(`dashboard/${params.cartId}`);
  }

  async function handleDeleteItem(itemId: string) {
    "use server";
    await deleteItem(itemId);
    revalidatePath(`dashboard/${params.cartId}`);
  }
  async function handleInvite(email: string, cartId: string) {
    "use server";
    await addContributor(email, cartId);
    revalidatePath(`dashboard/${params.cartId}`);
  }

  async function AIRecommendation(itemId : string) : Promise<string> {
    "use server"
    const result : string = await generateAIRecommendation(itemId)
    return result;
  }


  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <CartPage
        cart={cart.cart}
        items={items}
        addItem={handleAddItem}
        deleteItem={handleDeleteItem}
        addContributor={handleInvite}
        contributors={cart.cart.contributors}
        getAIRecommendation={AIRecommendation}
      />
    </Suspense>
  );
}

function DashboardSkeleton() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-green-50 dark:bg-gray-900">
      <div className="w-64 bg-green-800 dark:bg-gray-900">
        <Skeleton className="h-screen" />
      </div>
      <main className="flex-1 p-8">
        <Skeleton className="h-10 w-48 mb-8" />
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <Skeleton className="h-12" />
          <Skeleton className="h-12" />
        </div>
      </main>
    </div>
  );
}
