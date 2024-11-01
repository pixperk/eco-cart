export interface ShoppingList {
    id: number;
    name: string;
  }
  
  export interface ShoppingItem {
    id: number;
    name: string;
    quantity: number;
    unit: string;
    ecoScore?: number; // New: Add eco-friendliness score
    tags?: string[]; // New: Add categories/tags
  }
  
  export interface AiRecommendation {
    item: ShoppingItem;
    recommendation: string;
  }