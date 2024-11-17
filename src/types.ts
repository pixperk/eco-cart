export interface Cart {
    id: string;
    name: string;
  }
  
  export interface Item {
    id: string; name: string; qty: number; unit: string
  }
  
  export interface AiRecommendation {
    item: Item;
    recommendation: string;
  }