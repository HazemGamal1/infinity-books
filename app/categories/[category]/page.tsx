"use client"
import React, { FormEvent } from 'react'
import { useState, useEffect } from 'react'
import { client } from '@/app/lib/sanity'
import { IBook } from '@/app/utils/interfaces'
import { groq } from 'next-sanity'
import BookLandingCard from '@/app/components/BookLandingCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const CategoryPage = ({params} : {params: {category : string}}) => {
  const [books, setBooks] = useState<IBook[]>()
  const [viewArr, setViewArr] = useState<IBook[]>();
  const [searchVal, setSearchVal] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  let finalString = "";
  const removeUnwanted = (word: string) => {
    const substringToRemove = "%20";
    const startIdx = word.indexOf(substringToRemove);
    const endIndx = startIdx + substringToRemove.length;
    finalString = word.substring(0, startIdx) + " " +  word.substring(endIndx);
    if(!finalString.includes("%20"))
    {
      return;
    }
    removeUnwanted(finalString);
  }
  if(params.category.includes("%20")){
    removeUnwanted(params.category)
  }else{
    finalString = params.category;
  }

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
    const getCategoryBooks = async () => {
      setIsLoading(true);
      const books = await client.fetch(groq`*[_type == "book" && category[0]->name == "${finalString}"]{
        title,
        'imageUrl': image.asset->url,
        author,
        price,
        previousPrice,
        'slug': slug.current
        }`
      )
      setBooks(books)   
      setViewArr(books); 
      setIsLoading(false);
    }

    getCategoryBooks();
  }, [])
  
  return (
    <div className='max-w-screen-2xl mx-auto  pt-24'>
      <h1 className='font-bold text-neutral-500 text-3xl border-b-main pb-2 px-4'>{finalString}</h1>
      <form onSubmit={handleSubmit} className='flex gap-3 py-4 items-center px-4'>
        <label htmlFor='search'>Search</label>
        <Input type='text' onChange={(e) => setSearchVal(e.target.value)} id='search'/>
        <Button type='submit'>Submit</Button>
      </form>
      <div className='w-full px-4'>
        {
          viewArr !== books &&
          <Button variant={"outline"} className='mr-auto max-w-max' onClick={() => setViewArr(books)}>Show All</Button>
        }
      </div>
      <div className='grid px-2 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 py-4'>
        {
          viewArr?.map((book) => (<BookLandingCard key={book.slug} isLoading={isLoading} slug={book.slug} author={book.author} price={book.price} previousPrice={book.previousPrice} title={book.title} image={book.imageUrl}/>))
        }
      </div>
    </div>
  )
}

export default CategoryPage
