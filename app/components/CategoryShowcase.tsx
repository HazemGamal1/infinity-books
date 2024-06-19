import React from 'react'
import { useEffect, useState } from 'react';
import Image from "next/image";
import BookLandingCard from "./BookLandingCard";
import { client } from "../lib/sanity";
import { groq } from "next-sanity";
import { IBook } from "../utils/interfaces";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";

interface IProps {
  text: string,
  category: string,
  apiCall: string,
  categoryIndex: number,
  bookOnPage?: string,
}
const CategoryShowcase = ({text, category, categoryIndex, apiCall, bookOnPage} : IProps) => {
    const [books, setBooks] = useState<IBook[]>()
    const[isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const getCategoryBooks = async () => {
      setIsLoading(true);
      const books = await client.fetch(groq`*[_type == "book" && category[${categoryIndex}]->name == "${apiCall}"] | order(_title desc) [0...15]{
        title,
        'imageUrl': image.asset->url,
        author,
        price,
        previousPrice,
        'slug': slug.current
        }`
      )
      setBooks(books)    
      setIsLoading(false);
    }

    getCategoryBooks();
  }, [])

  return (
    <section className="max-w-screen-2xl mx-auto py-4">
      {
        category === "Top Of The Month" ? 
          <p className='font-bold text-neutral-500 text-2xl border-b border-b-main pb-2 select-none px-4'>Top Books Of The Month</p>
        :
        <Link href={`/categories/${category}`} className="mx-auto font-semibold text-2xl flex items-center gap-2 py-4 px-2 text-neutral-500 border-b-2 border-b-main hover:text-main duration-500">{text} <span className='text-xs'>Browse All</span><MdKeyboardArrowRight className='text-2xl text-main'/></Link>
      }
        <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 px-4 gap-4 pt-4"> 
        {
            books?.map((book, index) => (
              
                book.title !== bookOnPage &&
                (
                  <div key={index}>
                    {
                      book &&  
                      <BookLandingCard isLoading={isLoading} slug={book.slug} image={book.imageUrl} title={book.title} author={book.author} price={book.price} previousPrice={book.previousPrice}/>
                    }
                  </div>
                )
              
            ))
        }
        </div>
    </section>
  )
}

export default CategoryShowcase
