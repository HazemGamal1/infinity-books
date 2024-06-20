"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import {  Heart} from 'lucide-react'
import { motion } from 'framer-motion'
import { BiInfinite, BiMoon, BiX } from 'react-icons/bi'
import { FiShoppingCart } from 'react-icons/fi'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from '@/components/ui/input'
import useCartStore from '@/store/useCartStore'
import Image from 'next/image'
import CartCard from './CartCard'
import useWishlist from '@/store/useWishlistStore'
import { toast } from 'sonner'
import WishlistCard from './WishlistCard'
import { FaHeart } from 'react-icons/fa'
import { client } from '../lib/sanity'
const Navbar = () => {
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const {setTheme} = useTheme();
  const {cart, clearCart} = useCartStore();
  const {wishlist} = useWishlist();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const now = new Date();
  const formattedDate = now.toISOString();
  const total = cart.reduce((acc, book) => acc + (book.price * book.quantity), 0);

  const handlePlaceOrder = async () => {
    if(name.length < 3 || address.length < 5 || number.length < 11){
      toast.error("Data is invalid, please re-enter valid data");
      setName("");
      setAddress("");
      setNumber("");
      return;
    }
    setIsLoading(true);
    const orderDoc = {
        _type: 'order',
        customer: name,
        customerAddress: address,
        customerNumber: number,
        orderDate: formattedDate,
        products: cart.map(item => ({
        product: item.title,
        quantity: item.quantity,
        priceAtTime: item.price,
        _key: item.slug
        })),
        status: "successful",
        total: total
    }   

    try {
        const result = await client.create(orderDoc);
        toast.success("Order has been placed");
    }catch(error){
        toast.error("Problem placing order");
    }
    setIsLoading(false);
    clearCart();
}
  return (
    <motion.div 
          initial={{y: -10, opacity: 0}}
          animate={{y: 0, opacity: 1}}
          transition={{ease: "easeInOut", duration: 0.75}}
          className='fixed top-0 bg-white dark:bg-[black] w-full z-[20] border-b py-2 mx-auto flex items-center justify-between px-5 text-sm md:text-md lg:text-lg'
      >
      <h1 className='hover:opacity-95'><Link href="/" className='flex items-center '><BiInfinite className='text-5xl text-main'/>Infinity</Link></h1>

      <div className='flex gap-3 items-center'>
        <Link href={"/books"} className='hover:opacity-95'>Browse All </Link>
          
        <Sheet>
          <SheetTrigger>{
            wishlist.length > 0 ?
            <FaHeart className='text-main lg:text-2xl hover:opacity-95 text-xl '/>
            :
            <Heart className='lg:text-2xl hover:opacity-95 text-xl'/>
          }</SheetTrigger>
          <SheetContent className="h-full overflow-y-auto">
            <SheetHeader>
              <SheetTitle className='flex gap-2 items-center'><FaHeart className='text-main'/> WishList</SheetTitle>
              <SheetDescription>
                You have {wishlist.length} items in your wishlist
              </SheetDescription>
            </SheetHeader>
            <div className='flex flex-col gap-2 '>
              {
                wishlist.map((wishItem) => (<WishlistCard book={wishItem} key={wishItem.slug}/>))
              }
            </div>
          </SheetContent>
        </Sheet>
          
        <Sheet>
          <SheetTrigger>
            <div className='relative w-full h-full'>
              <FiShoppingCart className='text-xl lg:text-2xl hover:opacity-95'/>
              <div className='text-main rounded-full font-bold flex items-center absolute -top-2 -right-1 text-xs'>
                {
                  cart.length > 0 &&
                  cart.length
                }
              </div>
            </div>
            </SheetTrigger>
          <SheetContent className='overflow-y-auto h-full'>
            <SheetHeader>
              <SheetTitle>Cart Items</SheetTitle>
              <SheetDescription>
                You have {cart.length} items in your bag
              </SheetDescription>
            </SheetHeader>
            <div className='flex flex-col gap-2'>
              {
                cart.map((book) => (
                  <CartCard book={book} key={book.slug}/>
                ))
              }
            </div>
            {
              cart.length > 0 &&
              
              <Dialog>
                <div className='py-2'>
                  Total: {total} EGP
                </div>
                <DialogTrigger className='w-full bg-main p-2 text-white rounded-md hover:opacity-90 px-4'>Buy</DialogTrigger>
                <DialogContent>
                <DialogHeader>
                    <DialogTitle>Order confirmation</DialogTitle>
                    <DialogDescription>
                    Please enter your valid info to confirm order
                    </DialogDescription>
                </DialogHeader>
                  <label htmlFor="name">Name</label>
                  <Input type='text' id='name' onChange={(e) => setName(e.target.value)}/>
                  <label htmlFor="phone" className='flex gap-2 items-center'>Phone <span className='text-xs text-neutral-500'>(A phone number connected to whats app is preffered)</span></label>
                  <Input type='text' id='phone' onChange={(e) => setNumber(e.target.value)}/>
                  <label htmlFor="address">Address</label>
                  <Input type='text' id='address' onChange={(e) => setAddress(e.target.value)}/>
                  Total : {total} EGP
                  <Button onClick={() => handlePlaceOrder()}>Order</Button>
                </DialogContent>
              </Dialog>
            }
          </SheetContent>
        </Sheet>

        <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
      </div>
    </motion.div>
  )
}

export default Navbar
