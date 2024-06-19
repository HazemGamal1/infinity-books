import Link from 'next/link'
import React from 'react'
import { FaFacebook, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='w-full  bg-[#121212] py-8 text-white mt-12 border-t border-neutral-100 dark:bg-black dark:border-none'>
      <div className='max-w-screen-2xl mx-auto '>
        <div className='flex justify-between px-4'>
          <div>
            <p className='flex items-start gap-1'>Infinity <span className='text-main text-xs'>tm</span></p>
          </div>
          <div className='flex gap-3'>
          <Link href={"https://www.facebook.com/profile.php?id=61561049574955"} target='_blank'><FaFacebook className='text-xl hover:text-blue-600 duration-500'/></Link>
          <Link href={"https://www.instagram.com/_infinity_books___/"} target='_blank'><FaInstagram className='text-xl hover:text-red-500 duration-500'/></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
