import prisma from "@/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json()
    const {
        title,
        description,
        category,
        imageSrc,
        roomCount,
        bathroomCount,
        guestCount,
        location,
        price,
    } = body

    Object.keys(body).forEach((value:any) => {
        if(!body[value]){
            NextResponse.error()
        }
    })

    const listing = await prisma.listing.create({
        data:{
            title,
            description,
            category,
            imageSrc,
            roomCount,
            bathroomCount,
            guestCount,
            locationValue:location.value,
            price: parseInt(price,10),
            userId: currentUser.id
        }
    })

    return NextResponse.json(listing)
};
