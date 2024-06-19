import {create} from 'zustand'
import { persist } from 'zustand/middleware';
import { IBook, IcartItem } from '@/app/utils/interfaces'

interface CartState {
    cart: IcartItem[],
    addToCart: (book: IcartItem) => void,
    removeFromCart: (book: IcartItem) => void,
    clearCart: () => void,
    handleDecrement: (book: IcartItem) => void,
    handleIncrement: (book: IcartItem) => void
}

const useCartStore = create<CartState>()(
    persist(
      (set) => ({
        cart: [],
        addToCart: (book) => set((state) => {
          const existingItem = state.cart.find((cartItem) => cartItem.title === book.title);
          if (existingItem) {
            return {
              cart: state.cart.map((cartItem) =>
                cartItem.title === book.title
                  ? { ...cartItem, quantity: cartItem.quantity + book.quantity }
                  : cartItem
              ),
            };
          } else {
            return { cart: [...state.cart, book] };
          }
        }),
        removeFromCart: (item) => set((state) => ({
          cart: state.cart.filter((book) => book.title !== item.title),
        })),
        clearCart: () => set({ cart: [] }),
        handleDecrement: (item) => set((state) => ({
          cart: state.cart.map((cartItem) => cartItem.title === item.title ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem)
        })),
        handleIncrement: (item) => set((state) => ({
          cart: state.cart.map((cartItem) => cartItem.title === item.title ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem)
        })),
      }),
      {
        name: 'cart-storage', // name of the local storage item
      }
    )
  );

export default useCartStore;