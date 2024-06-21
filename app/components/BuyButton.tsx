'use client'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useState } from 'react';
import useCartStore from '@/store/useCartStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
interface IProps {
    title: string, 
    image: string,
    author: string, 
    price: number,
    quantity: number,
    slug: string
}
import { client } from '../lib/sanity';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import {IoIosCheckmarkCircleOutline } from "react-icons/io";

const BuyButton = ({title, price, slug} : IProps) => {
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [isOrdererd, setIsOrdered] = useState<boolean>(false);
  const {clearCart} = useCartStore();
  const now = new Date();
  const formattedDate = now.toISOString();
  const handlePlaceOrder = async () => {
    if(name.length < 3 || address.length < 5 || number.length < 11){
      toast.error("Data is invalid, please re-enter valid data");
      setName("");
      setAddress("");
      setNumber("");
      return;
    }
    const orderDoc = {
        _type: 'order',
        customer: name,
        customerAddress: address,
        customerNumber: number,
        orderDate: formattedDate,
        products: [{
          product: title,
          quantity: quantity,
          priceAtTime: price,
          _key: slug
        }],
        status: "pending",
        total: price
    }   

    try {
        
        const result = await client.create(orderDoc);
        toast.success("Order has been placed");
        setIsOrdered(true);
    }catch(error){
        toast.error("Problem placing order");
    }
}
const handleClose = () => {
  setIsOrdered(false);
  setName("");
  setQuantity(1)
  setNumber("");
  setAddress("");
}
  return (
  <Dialog>
        <DialogTrigger className='w-full bg-main p-2 text-white rounded-md hover:opacity-90 px-4'>Buy</DialogTrigger>
        <DialogContent>
        {
          isOrdererd ? 
                        <div className='grid place-content-center text-center'>
                          <IoIosCheckmarkCircleOutline className='text-main mx-auto text-8xl'/>
                          <p>Order was confirmed</p>
                          <p>Thank you for using Infinity Books</p>
                          <div className='dark:bg-neutral-700 bg-main/30 rounded-lg p-2 my-6'>
                            <p>في حالة الرغبة في الغاء او تغير الطلب يرجى الارسال الى صفحة من صفحاتنا على مواقع التواصل الاجتماعي</p>
                          </div>
                          <DialogTrigger onClick={() => handleClose()} className='bg-main w-full text-white p-2 rounded-lg'>Close</DialogTrigger>
                        </div>
                      :
                      <>
                      <DialogHeader>
                          <DialogTitle><span className='text-main'>{title}</span> book order confirmation</DialogTitle>
                          <DialogDescription>
                          Please enter your valid info to confirm order
                          </DialogDescription>
                      </DialogHeader>
                        <label htmlFor="name">Name</label>
                        <Input type='text' id='name' onChange={(e) => setName(e.target.value)} value={name}/>
                        <label htmlFor="phone" className='flex gap-2 items-center'>Phone <span className='text-xs text-neutral-500'>(Phone number must be connected to whats app )</span></label>
                        <Input type='text' id='phone' onChange={(e) => setNumber(e.target.value)} value={number}/>
                        <label htmlFor="address">Address</label>
                        <Textarea id='address' onChange={(e) => setAddress(e.target.value)} value={address}/>
              
                        <div className='flex w-full items-center justify-between'>
                          <label htmlFor="quantity" className='w-full'>Book Quantity</label>
                          <Input type='number' min={1} placeholder='1' id='quantity'onChange={(e) => setQuantity(Number(e.target.value))}/>
                        </div>
                        Total: {price * quantity} EGP
                        <Button onClick={() => handlePlaceOrder()}>Order</Button>
                      </>
        }
        </DialogContent>
    </Dialog>
  )
}

export default BuyButton
