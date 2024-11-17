"use server"
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/server_utils";
import { ItemToBeAdded } from "@/types";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";


export async function generateAICart(desc : string) {
 
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

  const schema = {
    description: "List of ecofriendly items related to the cart",
    type: SchemaType.ARRAY,
    items: {
      type: SchemaType.OBJECT,
      properties: {
        itemName: {
          type: SchemaType.STRING,
          description: "Name of the ecofriendly item",
          nullable: false,
        },
        qty  : {
          type : SchemaType.NUMBER,
          description : "Quantity of the item in number",
          nullable : false
        },
        unit : {
          type : SchemaType.STRING,
          description : "Unit in which this item should be bought (e.g. : pcs, boxes, l, kg)",
          nullable : false
        }
      },
      required: ["itemName","qty", "unit"],
    },
  };

  const itemModel = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  const nameModel = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const [itemsString, rawName] = await Promise.all([
    itemModel.generateContent(
      `List a few ecofriendly items to include in the shopping list with description: ${desc}. Item names must be concise and 1 to 4 words. Generate maximum 15 items.`
    ),
    nameModel.generateContent(
      `Generate a suitable 1-3 worded name for the shopping list with this description (only 1 name): ${desc}`
    )
  ]);
  
  const items : ItemToBeAdded[] = JSON.parse(itemsString.response.text());

  const name = rawName.response.text()

  const user = await getCurrentUser()

  const cart = await prisma.cart.create({
    data: {
      name,
      mainUserId: user.id,
    },
  });

await prisma.cartUser.create({
  data : {
    userId : user.id,
    cartId : cart.id,
    role : "MAIN"
  }
})

await Promise.all(
  items.map((item) => {
    return prisma.cartItem.create({
      data: {
        name: item.itemName, 
        qty: item.qty,   
        unit: item.unit, 
        cartId: cart.id, 
      },
    });
  })
);

  
}
