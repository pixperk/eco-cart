import { FC } from 'react'
import { generateEcoFriendlyItem, getAllCarts } from './actions'
import EcoProducts from './EcoProducts'
import { addItem } from '../actions'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'



const page: FC = async({}) => {
    
    async function handleGenerateAlternatives(itemDesc : string){
        "use server"
        const generatedItems = await generateEcoFriendlyItem(itemDesc)
        return generatedItems
    }

    const carts = await getAllCarts()

    async function handleAddItem(
        name: string,
        qty: number,
        unit: string,
        cartId: string
      ) {
        "use server";
        await addItem(name, qty, unit, cartId);
        revalidatePath(`/dashboard/${cartId}`);
        redirect(`/dashboard/${cartId}`);
      }
        
  return <EcoProducts generateItems={handleGenerateAlternatives} carts={carts} addToCart={handleAddItem}/>
}

export default page