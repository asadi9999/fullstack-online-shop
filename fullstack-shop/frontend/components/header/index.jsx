import React from 'react'
import Link from 'next/link'
import '../../app/globals.css'
const Header = () => {
  return (
    <>
        <ul className=' bg-[#212223] px-3 py2 w-full h-20 fixed mb-10 z-20 
            flex flex-col md:flex-row justify-center items-center gap-4'>
            <li>
                <Link href='/'>home</Link>
            </li>
            <li>
                <Link href='/uploadProduct'>add new product</Link>
            </li>
        </ul>
    </>
  )
}

export default Header