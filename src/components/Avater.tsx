'use client'
import Image from 'next/image'
import React from 'react'

interface AvaterProps {
    src?:string | null | undefined
}

const Avater: React.FC<AvaterProps> = ({src}) => {
    return (
        <Image className='rounded-full' height={'30'} width={'30'} alt='Avater' src={src ||'https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=826&t=st=1705747184~exp=1705747784~hmac=1de1a31beaa57ec64d258fc60393af8cabd91ff5a25d8ad90aff62f8e73c0496'}/>
    )
}

export default Avater