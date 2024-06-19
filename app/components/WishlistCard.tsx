import React from 'react'
import Image from 'next/image'
import { IWishlisttItem } from '../utils/interfaces'
import { BiX } from 'react-icons/bi'
import useWishlist from '@/store/useWishlistStore'
import { FaHeartBroken } from 'react-icons/fa'
import Link from 'next/link'
const WishlistCard = ({book} : {book: IWishlisttItem}) => {
    const {removeFromWishlist} = useWishlist();
  return (
    <div className='flex justify-between items-center'>
        <Link href={`/books/${book.slug}`} className='flex w-full py-6 hover:opacity-95 hover:scale-105 duration-200'>
            <div className='flex gap-2'>
                <div className='w-[3rem] h-[3rem]'><Image src={book.imageUrl} alt='cover art' className='object-cover object-center inset-0  my-auto' width={500} height={500}/></div>
                <div className='flex flex-col'>
                <p className='font-semibold text-wrap max-w-[10rem]'>
                    {book.title}
                </p>
                <p className='font text-neutral-500'>
                    {book.author}
                </p>
                </div>
            </div>
        </Link>
            <div>
                <FaHeartBroken className='text-xl hover:text-main cursor-pointer' onClick={() => removeFromWishlist(book.title)}/>
            </div>
    </div>
  )
}

export default WishlistCard
