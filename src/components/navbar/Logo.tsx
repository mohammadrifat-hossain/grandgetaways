'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Dancing_Script } from "next/font/google";

const font = Dancing_Script({ subsets: ["latin"] });

const Logo = () => {
    const router = useRouter()
    return (
        <>
            <Link href={'/'} className={`${font.className} font-[900] text-4xl hidden md:block`}>GrandGetaways<span className='text-orange-500'>.</span></Link>
            <Link href={'/'} className={`${font.className} font-[900] text-4xl block md:hidden`}>GG<span className='text-orange-500'>.</span></Link>
        </>
    )
}

export default Logo