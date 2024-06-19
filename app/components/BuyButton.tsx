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
const BuyButton = ({title, price, slug} : IProps) => {
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
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
    }catch(error){
        toast.error("Problem placing order");
    }
}
  return (
  <Dialog>
        <DialogTrigger className='w-full bg-main p-2 text-white rounded-md hover:opacity-90 px-4'>Buy</DialogTrigger>
        <DialogContent>
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
          <Input type='text' id='address' onChange={(e) => setAddress(e.target.value)} value={address}/>

          <div className='flex w-full items-center justify-between'>
            <label htmlFor="quantity" className='w-full'>Book Quantity</label>
            <Input type='number' min={1} placeholder='1' id='quantity'onChange={(e) => setQuantity(Number(e.target.value))}/>
          </div>
          <Button onClick={() => handlePlaceOrder()}>Order</Button>
        </DialogContent>
    </Dialog>
  )
}

export default BuyButton
