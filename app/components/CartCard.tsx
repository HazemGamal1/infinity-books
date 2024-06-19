import React, { useState } from 'react'
import { IcartItem } from '../utils/interfaces'
import { BiMinus, BiPlus, BiX } from 'react-icons/bi'
import Image from 'next/image'
import useCartStore from '@/store/useCartStore'
const CartCard = ({book} : {book: IcartItem}) => {
    const {cart, removeFromCart, handleDecrement , handleIncrement} = useCartStore();

    const decreaseQuantity = () => {
        if(book.quantity === 1){
            return;    
        }
        handleDecrement(book);
    }
    const increaseQuantity = () => {
        handleIncrement(book);
    }
  return (
    <div className='flex justify-between items-center w-full  py-6'>
        <div className='flex gap-2 items-center'>
            <div className='w-[3rem] h-[3rem]'><Image src={book.imageUrl} alt='cover art' className='object-contain object-center inset-0 ' width={500} height={500}/></div>
            <div className='flex flex-col'>
            <p className='font-semibold text-sm lg:text-lg'>
                {book.title}
            </p>
            <p className='font text-neutral-500 text-sm lg:text-lg'>
                {book.author}
            </p>
            <div className='font pt-3 flex gap-2 items-center'>
                <div className='flex items-center gap-2 select-none'>
                    <div className='rounded-full border-2 text-xl fles items-center hover:text-main cursor-pointer' onClick={() => decreaseQuantity()}>
                        <BiMinus />
                    </div>
                    {book.quantity}
                    <div className='rounded-full border-2 text-xl fles items-center hover:text-main cursor-pointer' onClick={() => increaseQuantity()}>
                        <BiPlus />
                    </div>
                </div>
            </div>
            </div>
        </div>
        <div>
            <BiX className='text-2xl hover:text-main cursor-pointer' onClick={() => removeFromCart(book)}/>
        </div>
    </div>
  )
}

export default CartCard
