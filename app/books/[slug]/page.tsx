"use client"
import React, { useEffect, useState } from 'react'
import {  ArrowRightCircleIcon} from 'lucide-react'
import { IBook } from '@/app/utils/interfaces'
import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import LoadScreen from '@/app/components/LoadScreen'
import CategoryShowcase from '@/app/components/CategoryShowcase'
import BooksByTheSameAuthor from '@/app/components/BooksByTheSameAuthor'
import BuyOptionsBox from '@/app/components/BuyOptionsBox'
import { FaHeart } from 'react-icons/fa'
import useWishlist from '@/store/useWishlistStore'

const Page = ({params} : {params: {slug : string}}) => {
    const [showDescription, setShowDescription] = useState<boolean>(false);
    const [book, setBook] = useState<IBook>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {wishlist, addToWishlist, removeFromWishlist} = useWishlist();
    const isWishlisted = wishlist.some((wishlistItem) => wishlistItem.title === book?.title);
    
    const handleAddToWishlist = (title: string, image: string, author: string, price: number, slug: string) => {
        if(isWishlisted){
          removeFromWishlist(title);
          
        }
        else{
          addToWishlist({title: title, imageUrl: image, author: author, price: price, slug: slug});
        }
      }
    useEffect(() => {
        const  getBook =  async () => {
                setIsLoading(true);
                const book = await client.fetch(groq`*[_type == 'book' && slug.current == "${params.slug}"][0]{
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
                    setBook(book);
                    setIsLoading(false);    
            }
            getBook();
    }, [])

    if(!book && isLoading === false) return(<div className='w-full h-screen grid place-content-center'>Data Not found</div>)
  return (
    <>
        <div className='mt-20 relative'>
            {isLoading && <LoadScreen />}
                <div className='w-full h-full  flex flex-col mx-auto lg:flex-row gap-6 justify-between max-w-screen-2xl pt-12 px-4'>
                    <div className='flex flex-col lg:flex-row gap-6 w-full'>
                        <div className=''>
                            {
                                book?.imageUrl &&
                                <img src={book?.imageUrl} alt='cover art' width={350} height={350} className='mx-auto rounded-lg'/>
                            }
                        </div>
                        <div className='flex flex-col justify-between lg:w-[55%]'>
                            <div>
                                <p className='text-white rounded-full  max-w-max p-2 text-sm bg-[#EC1E24] '>{book?.categoryName}</p>
                                <h1 className='uppercase font-bold mt-3'>{book?.title}</h1>
                                <p className='mb-3'>by {book?.author}</p>
                                {
                                    book &&
                                        <div className='flex gap-2 items-center bg-gray-200 dark:bg-black rounded-full px-3 py-2 max-w-max my-4 cursor-pointer' onClick={() => handleAddToWishlist(book?.title, book?.imageUrl, book?.author, book?.price,  book?.slug)}>
                                            <FaHeart className={`${isWishlisted && "text-main"}`}/>
                                        <p className=''>{isWishlisted ? "Wishlisted" : "Wishlist"}</p>
                                    </div>
                                }
                                {
                                    book?.description !== null &&
                                    <div className='rounded-xl bg-gray-200 dark:bg-black'>
                                        <div className='flex gap-2 bg-gray-200 dark:bg-black p-2 items-center cursor-pointer hover:opacity-85 hover:bg-gray-300 duration-300 rounded-t-r-lg' onClick={() => setShowDescription(!showDescription)}>
                                            <ArrowRightCircleIcon className={`${showDescription && "rotate-90"}`}/>
                                            <p className='text-lg'>Description</p>
                                        </div>
                                        {
                                            
                                            showDescription && <p className='py-4 px-2 pt-2'>{book?.description}</p>
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    {
                        book &&
                        <BuyOptionsBox book={{...book}}/>
                    }
                </div>
                {
                    book?.author &&    
                    <BooksByTheSameAuthor author={book?.author} bookOnPage={book?.title}/>
                }
            <div className=' pt-28'>
                <div className=''>
                    {
                        book &&
                        <CategoryShowcase text="Similar Books" category={`${book.categoryName}`} categoryIndex={0} apiCall={book.categoryName} bookOnPage={book.title}/>
                    }
                </div>
            </div>
        </div>
    </>
  )
}

export default Page
