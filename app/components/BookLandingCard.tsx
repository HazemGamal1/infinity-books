"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import useCartStore from '@/store/useCartStore';
import Link from 'next/link';
import BuyButton from './BuyButton';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { FiShoppingCart } from 'react-icons/fi';
import useWishlist from '@/store/useWishlistStore';

interface IProps {
  image: string,
  title: string, 
  author: string, 
  price: number,
  previousPrice: number,
  slug: string,
  isLoading: boolean
}
const BookLandingCard = ({image, title, author, price, previousPrice, slug, isLoading} : IProps) => {
  
  const {cart, addToCart} = useCartStore();
  const {addToWishlist, wishlist, removeFromWishlist} = useWishlist();
  const isWishlisted = wishlist.some((item) => item.title === title);
  const handleAddToCart= (title: string, image: string, author: string, price: number, slug: string) => {
    addToCart({title: title, imageUrl: image, author: author, price: price, quantity: 1, slug: slug});
    if(cart.some((book) => book.title === title))
    {
      toast.success("Book quantity increased.")
    }else{
      toast.success("Added to cart");
    }
  } 

  const handleAddToWishlist = (title: string, image: string, author: string, price: number, slug: string) => {
    if(isWishlisted){
      removeFromWishlist(title);
      
    }
    else{
      addToWishlist({title: title, imageUrl: image, author: author, price: price,  slug: slug});
    }
  }
  return (
    <div className="flex flex-col justify-between shadow-xl  hover:opacity-90 duration-500  h-full rounded-lg dark:bg-black bg-white relative">
      <Button onClick={() => handleAddToWishlist(title, image, author, price, slug)} variant={'outline'} className='z-[10] absolute top-2 right-2 max-w-max text-xs lg:text-lg group'>
        {
           isWishlisted ?
           <div className=''>
              <FaHeartBroken className='hidden group-hover:block text-red-600 text-lg'/>
              <FaHeart className='text-red-600 group-hover:hidden text-lg'/>
           </div>
           :
            <FaHeart className='text-lg'/>
        }
        
      </Button>
    <Link href={`/books/${slug}`}>
        <div className='relative w-full h-[18rem] xl:h-[28rem] overflow-hidden '>
          {
            isLoading ?
            <Skeleton className='w-full h-full'/>
            :
            <Image alt="book-cover" priority src={image} className="inset-0 h-full absolute object-cover mx-auto w-full rounded-t-lg hover:scale-105 duration-700 " width={1000} height={1000}/>
            
          }
        </div>
          <div className="px-8 py-4 text-center">
          <p className="font-bold mt-2  text-center">{title}</p>
          {
            isLoading &&
            <>
              <Skeleton className='w-[8rem] h-[1rem]'/>
              <Skeleton className='w-[4rem] h-[1rem] mt-4 mx-auto'/>
            </>
          }
          <p className="text-neutral-500">{author}</p>
          {
           isLoading ? <Skeleton className='w-[4rem] h-[2rem] mx-auto mt-2'/> :
            <p className="text-lg"><span className="text-main font-bold text-xl">{price}</span> EGP <span className="line-through text-neutral-400 mr-1 text-sm">{previousPrice}</span></p>
          }
          </div>
    </Link>
    <div className='flex ml-auto gap-2  mb-2 items-center mx-auto lg:mr-2'>
      <BuyButton title={title} image={image} author={author} price={price} quantity={1} slug={slug}/>
      <Button onClick={() => handleAddToCart(title, image, author, price, slug)} variant={'outline'} className='max-w-max '><FiShoppingCart/></Button>
      
    </div>
      </div>
  )
}

export default BookLandingCard
