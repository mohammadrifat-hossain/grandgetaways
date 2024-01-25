import getCurrentUser from '@/app/actions/getCurrentUser'
import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'

interface IParams {
    listingid: string
}

export const DELETE = async (req:Request,{params}:{params: IParams}) => {
    const currentUser = await getCurrentUser()

    if(!currentUser){
        return NextResponse.error()
    }

    const { listingid } = params

    if(!listingid || typeof listingid !== 'string'){
        throw new Error('Invalid ID')
    }

    const listing = await prisma.listing.deleteMany({
        where:{
            id: listingid,
            userId: currentUser.id
        }
    })

    return NextResponse.json(listing)
}