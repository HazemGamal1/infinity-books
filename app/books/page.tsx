"use client"
import React, { useEffect, useState, FormEvent } from 'react'
import { client } from '../lib/sanity';
import { groq } from 'next-sanity';
import { IBook } from '../utils/interfaces';
import BookLandingCard from '../components/BookLandingCard';
import LoadScreen from '../components/LoadScreen';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const BooksPage = () => {
  const [books, setBooks] = useState<IBook[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [viewArr, setViewArr] = useState<IBook[]>();
  const [searchVal, setSearchVal] = useState<string>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setViewArr(books);
    if(searchVal){
      const newArr = books?.filter((book) => book.title.trim().toLowerCase().includes(searchVal?.trim().toLowerCase()));
      setViewArr(newArr);
    }else{
      setViewArr(books);
    }
  }

  useEffect(() => {
    const getBooks = async () => {
      setIsLoading(true);
      try{
          const books = await client.fetch(groq`*[_type == 'book']{
            title,
            author,
            price,
            previousPrice,
            "imageUrl": image.asset->url,
            description,
            "slug": slug.current,
            "categoryName": category[0]->name,
            isOnSale
            }`) 
            setBooks(books);
            setViewArr(books);
            setIsLoading(false);
      }catch(error){
        console.log(error);
      }
    }
    getBooks()
  }, [])

  return (
    <div className='w-full'>
      {isLoading && <LoadScreen />}
      <div className='min-h-screen  max-w-screen-2xl  gap-2 mx-auto pt-32 '>
        <form onSubmit={handleSubmit} className='flex gap-3 items-center px-4'>
          <label htmlFor='search'>Search</label>
          <Input type='text' onChange={(e) => setSearchVal(e.target.value)} id='search'/>
          <Button type='submit'>Submit</Button>
        </form>
      <div className='w-full px-4 py-4'>
        {
          viewArr !== books &&
          <Button variant={"outline"} className='mr-auto max-w-max' onClick={() => setViewArr(books)}>Show All</Button>
        }
      </div>
        <div className='w-full grid  grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-4 px-2 '>
          {
            viewArr?.map((book) => (<BookLandingCard isLoading={isLoading} slug={book.slug} author={book.author} title={book.title} image={book.imageUrl} price={book.price} previousPrice={book.previousPrice} key={book.slug}/>))
          }
        </div>
      </div>
    </div>
  )
}

export default BooksPage
