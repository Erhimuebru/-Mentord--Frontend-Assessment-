import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartState } from '@/service/types/cart'
import { Product } from '@/service/types/products'

const initialState: CartState = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const product = action.payload
      const idx = state.items.findIndex((i) => i.product.id === product.id)
      if (idx >= 0) {
        state.items[idx].qty += 1
      } else {
        state.items.push({ product, qty: 1 })
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      const productId = action.payload
      state.items = state.items.filter((i) => i.product.id !== productId)
    },
    decrementQty(state, action: PayloadAction<number>) {
      const productId = action.payload
      const idx = state.items.findIndex((i) => i.product.id === productId)
      if (idx >= 0) {
        if (state.items[idx].qty > 1) state.items[idx].qty -= 1
        else state.items.splice(idx, 1)
      }
    },
    clearCart(state) {
      state.items = []
    },
  },
})

export const { addToCart, removeFromCart, decrementQty, clearCart } = cartSlice.actions
export default cartSlice.reducer
