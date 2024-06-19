import React, { useEffect, useState } from 'react'
import { client } from '../lib/sanity'
import { groq } from 'next-sanity'
import { IBook } from '../utils/interfaces'
import Link from 'next/link'
import BookLandingCard from './BookLandingCard'

const BooksByTheSameAuthor = ({author, bookOnPage} : {author: string, bookOnPage: string}) => {
    const [books, setBooks] = useState<IBook[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        const getBooks = async () => {
            setIsLoading(true);
            const books = await client.fetch(groq`*[_type == 'book' && author == '${author}']{
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
            setIsLoading(false);
        }
        getBooks();
    }, [])
    if(books?.length === 1) return;
  return (
    <div className='max-w-screen-2xl mx-auto mt-12 px-2'>
        <div>
            <p className='text-neutral-500 font-semibold text-2xl'>{books?.length > 1 && "Books By The Same Author"}</p>
        </div>
        <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 pt-6'>
            {
                books?.map((book) => book.title !== bookOnPage &&  (<BookLandingCard isLoading={isLoading} slug={book.slug} price={book.price} previousPrice={book.previousPrice} author={book.author} title={book.title} image={book.imageUrl} key={book.title}/>))
            }
        </div>
    </div>
  )
}

export default BooksByTheSameAuthor
