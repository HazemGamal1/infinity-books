import React from 'react'
import { Grid } from "lucide-react";
import { Pen } from "lucide-react";
import Link from 'next/link';
const FloatingNavigator = () => {
  return (
    <div className="sticky bottom-3 w-full flex  max-w-max ml-auto px-4 py-2 rounded-full">
          <div className="w-full flex gap-4">
            <Link href={"/categories"} className="border-r-2 pr-2 flex flex-col gap-2 items-center text-xs hover:text-red-600 transition duration-500">
              <Grid />
              <p>Categories</p>
            </Link>
            <div className="flex flex-col gap-2 items-center text-xs">
              <Pen />
              <p>Authors</p>
            </div>
          </div>
        </div>
  )
}

export default FloatingNavigator
