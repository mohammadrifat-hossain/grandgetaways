import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server';

interface IParams {
    listingid?: string;

}

export const POST = async (request:Request,{params}:{params :IParams}) => {
    const currentUser = await getCurrentUser()

    if(!currentUser){
        return NextResponse.error();
    }

    const {listingid} = params;
    

    if(!listingid || typeof listingid !== 'string'){
        throw new Error("Invalid ID")
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds.push(listingid)

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data:{
            favoriteIds
        }
    })

    return NextResponse.json(user)
}

export const DELETE = async (req:Request,{params}:{params:IParams}) => {
    const currentUser = await getCurrentUser()

    if(!currentUser){
        return NextResponse.error()
    }

    const {listingid} = params;

    if(!listingid || typeof listingid !== 'string'){
        throw new Error("Invalid ID")
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])]

    favoriteIds = favoriteIds.filter((id)=> id !== listingid)

    const user = await prisma.user.update({
        where:{
            id: currentUser.id
        },
        data:{
            favoriteIds
        }
    })

    return NextResponse.json(user)
}