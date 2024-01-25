import prisma from '@/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';

export const POST = async (req:Request) => {
    const currentUser = await getCurrentUser()

    if(!currentUser){
        return NextResponse.error()
    }

    const body = await req.json()

    const {listingid, startDate, endDate, totalPrice} = body;

    if(!listingid || !startDate || !endDate || !totalPrice){
        return NextResponse.error()
    }

    const listingAndReservation = await prisma.listing.update({
        where: {
            id: listingid
        },
        data:{
            reservations:{
                create:{
                    userId: currentUser.id,
                    startDate,
                    endDate,
                    totalPrice
                }
            }
        }
    })

    return NextResponse.json(listingAndReservation)
}