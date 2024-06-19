import React from 'react'
import { Button } from '@/components/ui/button'
import { BiMinus, BiPlus } from 'react-icons/bi'
import { IBook } from '../utils/interfaces'
import { BsCash } from 'react-icons/bs'
import { useState } from 'react'
import useCartStore from '@/store/useCartStore'
import BuyButton from './BuyButton'

const BuyOptionsBox = ({book} : {book : IBook}) => {
    const [showPayment, setShowPayment] = useState<boolean>(false);
    const [quantity, setQuantity] = useState<number>(1);
    const {addToCart} = useCartStore();


    const handleDecrement = () => {
        if(quantity === 1) {
            return;
        }
        setQuantity((prev) => prev - 1);
    }
  return (
    <div className='lg:w-[25%]'>
        <div className='bg-red-400/20 p-4 w-full rounded-lg'>
            <p className='text-4xl font-bold py-3'><span className='text-main'>{book?.price}</span> EGP</p>
            <p className='flex gap-2 py-2 items-center'><BsCash  className='text-2xl'/> <span className='text-nowrap '>Pay On Delivery</span></p>
            <div className='flex gap-4 py-4 select-none'>
                <p>Quantity : </p>
                <div className='flex gap-2 items-center'>
                    <div className='rounded-full border-2 text-xl fles items-center hover:text-main cursor-pointer border-black dark:border-white' onClick={() => handleDecrement()}>
                        <BiMinus />
                    </div>
                        {quantity}
                    <div className='rounded-full border-2 text-xl fles items-center hover:text-main cursor-pointer border-black dark:border-white' onClick={() => setQuantity((prev) => prev + 1)}>
                        <BiPlus />
                    </div>
                </div>
            </div>
            {
                book &&
                <Button className='my-2 w-full select-none' variant={"outline"} onClick={() => addToCart({title: book.title, author: book.author,  price: book.price, slug: book.slug, imageUrl: book.imageUrl, quantity: quantity})}>Add To Cart</Button>

            }
            <BuyButton price={book.price} title={book.title} author={book.author} quantity={quantity} slug={book.slug} image={book.imageUrl}/>
        </div>
    </div>
  )
}

export default BuyOptionsBox
