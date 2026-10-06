import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from './sanityStore';

export type CartItem = {
  product: Product;
  size: string;
  colour: string;
  quantity: number;
};

interface CartState {
  cart: CartItem[];
  saved: string[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  toggleSaved: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      saved: [],
      addToCart: (newItem) => set((state) => {
        const existing = state.cart.findIndex(
          (item) => item.product.id === newItem.product.id && item.size === newItem.size && item.colour === newItem.colour
        );
        if (existing !== -1) {
          const updated = [...state.cart];
          updated[existing].quantity += newItem.quantity;
          return { cart: updated };
        }
        return { cart: [...state.cart, newItem] };
      }),
      removeFromCart: (index) => set((state) => ({
        cart: state.cart.filter((_, i) => i !== index)
      })),
      toggleSaved: (id) => set((state) => ({
        saved: state.saved.includes(id) ? state.saved.filter(i => i !== id) : [...state.saved, id]
      })),
      clearCart: () => set({ cart: [] }),
    }),
    { name: 'haniya-cart-store' }
  )
);
