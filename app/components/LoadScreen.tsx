import React from 'react'
import { InfinitySpin } from 'react-loader-spinner'
const LoadScreen = () => {
  return (
    <div className='fixed top-0 w-full h-full bg-white/80 dark:bg-black/80  z-[100000] grid place-content-center'>
        <InfinitySpin color='#EC1E24'/>
    </div>
  )
}

export default LoadScreen
