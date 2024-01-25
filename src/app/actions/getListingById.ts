import prisma from '@/libs/prismadb'

interface IParams {
    listingid: string
}

const getListingById = async (params:IParams) => {
    try {
        const { listingid } = params
        const listing = await prisma.listing.findUnique({
            where:{
                id: listingid
            },
            include:{
                user: true
            }
        })

        if(!listing){
            return null;
        }

        return {
            ...listing,
            createdAt: listing.createdAt.toISOString(),
            user:{
                ...listing.user,
                createdAt: listing.user.createdAt.toISOString(),
                updatedAt: listing.user.updatedAt.toISOString(),
                emailVerified: listing.user.emailVerified?.toISOString() || null
            }
        }
    } catch (error: any) {
        throw new Error(error.message)
    }
}
export default getListingById