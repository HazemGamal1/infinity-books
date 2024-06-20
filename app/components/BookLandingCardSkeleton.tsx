import React from 'react'
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Skeleton } from '@/components/ui/skeleton';

const BookLandingCardSkeleton = () => {
  return (
    <div className="flex flex-col justify-between shadow-xl  text-sm lg:text-xl hover:opacity-90 duration-500  h-full rounded-lg dark:bg-black bg-white relative">
        <Button variant={'outline'} className='z-[10] absolute top-2 right-2 max-w-max text-xs lg:text-lg group'>    
            <FaHeart className='text-lg'/>
        </Button>
        <div className='relative w-full h-[18rem] xl:h-[28rem] overflow-y-hidden'>
            <Skeleton className='w-full h-full mx-auto'/>
        </div>
        <div className="px-8 py-4 text-center">
            <Skeleton className='w-[8rem] h-[1rem] mx-auto'/>
            <Skeleton className='w-[4rem] h-[1rem] mt-4 mx-auto'/>
            <Skeleton className='w-[4rem] h-[2rem] mx-auto mt-2'/> 
        </div>
    </div>
  )
}

export default BookLandingCardSkeleton
