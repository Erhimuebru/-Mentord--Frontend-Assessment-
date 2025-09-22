import { Product } from "./products";

  export interface CartItem {
    product: Product
    qty: number
    id?:number
  }

  export interface CartState {
    items: CartItem[];
  }