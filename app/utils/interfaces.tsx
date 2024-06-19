export interface IBook {
    title: string,
    author: string,
    description: string,
    categoryName: string,
    price: number,
    previousPrice: number,
    imageUrl: string,
    slug: string,
    isOnSale: boolean
}
export interface IcartItem {
    title: string,
    author: string,
    price: number,
    imageUrl: string,
    slug: string,
    isOnSale?: boolean,
    quantity: number
}
export interface IWishlisttItem {
    title: string,
    author: string,
    price: number,
    imageUrl: string,
    slug: string,
}