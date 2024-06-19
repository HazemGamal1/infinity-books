import React from 'react'
import { Search } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import image1 from '@/public/37842353.jpg'
import image2 from '@/public/songofAchilles.jpg'
import image3 from '@/public/el-kadmon.webp'
import image4 from '@/public/sevenkingdoms.jpg'
import image5 from '@/public/itendswithus.jpg'
import image6 from '@/public/the-power-of-habit.jpg'
import image7 from '@/public/58517519.jpg'
import image8 from '@/public/syrosh.jpg'
import image9 from '@/public/ard-zykola.jpg'
import image10 from '@/public/the-wicked-king.jpg'
import vector1 from '@/public/Abstract-Wind-Line-2--Streamline-Beveled-Scribbles.png'
import vector2 from '@/public/Abstract-Water-Shadow-Line--Streamline-Geometric-Shapes.png'

import { useState } from 'react'
import LoadScreen from './LoadScreen'
import { animate, motion } from 'framer-motion'
const Hero = () => {


  return (
    <section className="w-full h-full flex flex-col justify-between pb-4">
        <div>
          <div className="relative max-w-[1920px] mx-auto w-full 2xl:min-h-[920px] ">
            <div className="h-full">
            <motion.div initial={{x: -20, rotate: -5 , opacity: 0}} animate={{x: 0, rotate: 0,  opacity: 1}} transition={{ease:"easeInOut", duration: 0.75}}  className='absolute left-[15rem] top-[7rem] lg:top-[10rem] z-10 dark:hidden' >
                <Image  src={vector1}alt='vector-design'/>
            </motion.div>
              {/* <Image src={vector1}  alt='vector-design'/> */}
              <motion.div initial={{x: -20 , opacity: 0}} animate={{x: 0, opacity: 1}} transition={{ease:"easeInOut", duration: 0.75}}  className='absolute right-[15rem] bottom-[-5rem] lg:top-[10rem] z-[2] dark:hidden' >
                <Image  src={vector2}alt='vector-design'/>
              </motion.div>
              <div className="flex w-full flex-col items-center  pt-48 ">
                <h1 className="text-3xl max-w-[25rem] md:text-3xl lg:text-4xl font-bold lg:max-w-[42rem] text-center tracking-wide pb-24 z-[10]">Get comfortable and let us introduce you to your next favourite read</h1>
                {/* <div className="flex gap-4 items-center w-[90%] z-[2]">
                  <div className="flex gap  bg-white border-4 rounded-full w-full lg:w-[400px] mx-auto my-12">
                    <div className=" border-r-2 p-2 hover:bg-red-500 hover:text-white rounded-l-full border-1 cursor-pointer" onClick={() => getAuthorData(authorName)}>
                      <Search />
                    </div>
                    <input type="search" className="pl-2 w-full p-2 focus:outline-none rounded-r-full " placeholder="Search Author, book or category...." onChange={(e) => setAuthorName(e.target.value)}/>
                  </div>
                </div> */}
              </div>
              <div className="hidden 2xl:block"> 
                <Link href="books/qwaad-jartyn"><Image src={image1} alt="cover" className={`absolute shadow-xl rounded-lg right-[2rem] bottom-[2rem] hover:scale-105 transition-transform duration-500 cursor-pointer`} width={190} height={190}/></Link>
                <Link href="books/the-song-of-achilles"><Image src={image2} alt="cover" className={`absolute shadow-xl rounded-lg left-[2rem] bottom-[2rem] hover:scale-105 transition-transform duration-500 cursor-pointer`} width={190} height={190}/></Link>
                <Link href="books/alqadmwn"><Image src={image3} alt="cover" className={`absolute shadow-xl rounded-lg right-[18rem] bottom-[1rem] z-[10] hover:scale-105 transition-transform duration-500 cursor-pointer`} width={170} height={170}/></Link>
                <Link href="books/a-knight-of-the-seven-kingdoms"><Image src={image4} alt="cover" className={`absolute shadow-xl rounded-lg left-[18rem] bottom-[1rem] hover:scale-105 transition-transform duration-500 cursor-pointer`} width={170} height={170}/></Link>
                <Link href="books/sqtry"><Image src={image7} alt="cover" className={`absolute shadow-xl rounded-lg right-[8rem] top-[13rem] hover:scale-105 transition-transform duration-500 cursor-pointer z-[5]`} width={160} height={160}/></Link>
                <Link href="books/it-ends-with-us"><Image src={image5} alt="cover" className={`z-[10] absolute shadow-xl rounded-lg left-[8rem] top-[13rem] hover:scale-105 transition-transform duration-500 cursor-pointer`} width={160} height={160}/></Link>
                <Link href="books/ardh-zykwla"><Image src={image9} alt="cover" className={`absolute z-10 shadow-xl rounded-lg right-[25rem] bottom-[20rem] hover:scale-105 transition-transform duration-500 cursor-pointer`} width={170} height={170}/></Link>
                <Link href="books/the-power-of-habit"><Image src={image6} alt="cover" className={`absolute shadow-xl rounded-lg left-[25rem] bottom-[20rem] hover:scale-105 transition-transform duration-500 cursor-pointer`} width={170} height={170}/></Link>
                <Link href="books/syrwsh"><Image src={image8} alt="cover" className={`absolute z-10 shadow-xl rounded-lg right-[35rem] bottom-[0.5rem] hover:scale-105 transition-transform duration-500 cursor-pointer`} width={170} height={170}/></Link>
                <Link href="books/the-wicked-king"><Image src={image10} alt="cover" className={`absolute z-10 shadow-xl rounded-lg left-[35rem] bottom-[0.5rem] hover:scale-105 transition-transform duration-500 cursor-pointer`} width={170} height={170}/></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Hero
