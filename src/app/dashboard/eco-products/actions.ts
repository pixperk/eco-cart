import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/server_utils";
import { ItemToBeAdded } from "@/types";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

export async function generateEcoFriendlyItem(itemDesc: string) {
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
        qty: {
          type: SchemaType.NUMBER,
          description: "Quantity of the item in number",
          nullable: false,
        },
        unit: {
          type: SchemaType.STRING,
          description: "Unit in which this item should be bought (e.g., pcs, boxes, l, kg)",
          nullable: false,
        },
      },
      required: ["itemName", "qty", "unit"],
    },
  };

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  const generatedContent = await model.generateContent(
    `List maximum 5 ecofriendly alternatives to include in a shopping list for the item fitting this description: ${itemDesc}. Item names must be concise and 1 to 4 words.`
  );

  const items : ItemToBeAdded[] = JSON.parse(generatedContent.response.text());
  return items;
}


export async function getAllCarts() {
    const user = await getCurrentUser()
    const carts = await prisma.cartUser.findMany({
        where : {userId : user.id},
        select : {
            cart : true
        }
    })

    return carts
}
