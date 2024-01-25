import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from '@/libs/prismadb'
import { NextResponse } from "next/server";

interface IParams {
    reservationid:string
}

export const DELETE = async (req:Request,{params}:{params: IParams}) => {
    const currentUser = await getCurrentUser()

    if(!currentUser){
        return NextResponse.error()
    }

    const { reservationid } = params

    if(!reservationid || typeof reservationid !== 'string'){
        throw new Error('Invalid Id')
    }

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationid,
            OR:[
                {userId: currentUser.id},
                {listing: { userId: currentUser.id}}
            ]
        },
    })

    return NextResponse.json(reservation)
}