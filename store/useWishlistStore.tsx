import { IBook, IWishlisttItem } from '@/app/utils/interfaces'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface WishlistState {
    wishlist: IWishlisttItem[],
    addToWishlist: (book: IWishlisttItem) => void,
    removeFromWishlist: (title: string) => void,
}

const useWishlist = create<WishlistState>()(
    persist(
        (set) => ({
            wishlist: [],
            addToWishlist: (book) => set((state) => {
                const existingItem = state.wishlist.find((wishlistItem) => wishlistItem.title === book.title);
                if(existingItem){
                    return {wishlist: [...state.wishlist]};
                }else{
                    return { wishlist : [...state.wishlist, book]}
                }
            }),
            removeFromWishlist: (title) => set((state) => ({
                wishlist: state.wishlist.filter((wishlistItem) => wishlistItem.title !== title)
            }))
        }),
        {
            name: 'wishlist-storage', 
        }

    )
)

export default useWishlist;