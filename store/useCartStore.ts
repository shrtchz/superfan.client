// stores/cart-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  discount?: number;
  extras?: ExtraItem[][];
}

export interface ExtraItem {
  id: string;
  name: string;
  price: number;
}

interface CartState {
  // State
  items: CartItem[];
  total: number;
  itemCount: number;
  
  // Actions
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (id: string) => number;
  calculateTotals: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      total: 0,
      itemCount: 0,

      // Add item to cart or increment quantity if already exists
      addToCart: (item) => {
        set((state) => {
          const existingItem = state.items.find((cartItem) => cartItem.id === item.id);
          
          let newItems: CartItem[];
          if (existingItem) {
            // Increment quantity if item exists
            newItems = state.items.map((cartItem) =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            );
          } else {
            // Add new item with quantity 1
            newItems = [...state.items, { ...item, quantity: 1 }];
          }

          const itemCount = newItems.reduce((total, item) => total + item.quantity, 0);
          const total = newItems.reduce((sum, item) => {
            const itemTotal = item.price * item.quantity;
            const discount = item.discount ? (item.discount / 100) * itemTotal : 0;
            return sum + (itemTotal - discount);
          }, 0);

          return {
            items: newItems,
            itemCount,
            total,
          };
        });
      },

      // Remove item from cart completely
      removeFromCart: (id) => {
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== id);
          const itemCount = newItems.reduce((total, item) => total + item.quantity, 0);
          const total = newItems.reduce((sum, item) => {
            const itemTotal = item.price * item.quantity;
            const discount = item.discount ? (item.discount / 100) * itemTotal : 0;
            return sum + (itemTotal - discount);
          }, 0);

          return {
            items: newItems,
            itemCount,
            total,
          };
        });
      },

      // Update specific item quantity
      updateQuantity: (id, quantity) => {
        if (quantity < 1) {
          get().removeFromCart(id);
          return;
        }

        set((state) => {
          const newItems = state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ).filter(item => item.quantity > 0); // Remove items with 0 quantity

          const itemCount = newItems.reduce((total, item) => total + item.quantity, 0);
          const total = newItems.reduce((sum, item) => {
            const itemTotal = item.price * item.quantity;
            const discount = item.discount ? (item.discount / 100) * itemTotal : 0;
            return sum + (itemTotal - discount);
          }, 0);

          return {
            items: newItems,
            itemCount,
            total,
          };
        });
      },

      // Clear entire cart
      clearCart: () => {
        set({
          items: [],
          total: 0,
          itemCount: 0,
        });
      },

      // Get quantity of specific item
      getItemQuantity: (id) => {
        const item = get().items.find((item) => item.id === id);
        return item ? item.quantity : 0;
      },

      // Recalculate totals (useful for complex scenarios)
      calculateTotals: () => {
        set((state) => {
          const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
          const total = state.items.reduce((sum, item) => {
            const itemTotal = item.price * item.quantity;
            const discount = item.discount ? (item.discount / 100) * itemTotal : 0;
            return sum + (itemTotal - discount);
          }, 0);

          return {
            itemCount,
            total,
          };
        });
      },
    }),
    {
      name: 'cart-storage', // name for the persisted storage
      // Optional: you can whitelist/blacklist specific state properties
      // partialize: (state) => ({ items: state.items }),
    }
  )
);