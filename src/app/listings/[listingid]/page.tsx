import getCurrentUser from "@/app/actions/getCurrentUser"
import getListingById from "@/app/actions/getListingById"
import ClientOnly from "@/components/ClientOnly"
import EmptyState from "@/components/EmptyState"
import ListingClient from "./ListingClient"
import getReservations from "@/app/actions/getReservations"

interface IParams {
    listingid: string
}

const ListingPage = async ({params}:{params: IParams}) => {
    const listing = await getListingById(params)
    const currentUser = await getCurrentUser()
    const reservations = await getReservations(params)

    if(!listing){
        return(
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    }
    return (
        <ClientOnly>
            <ListingClient 
                listing={listing}
                currentUser={currentUser}
                reservations={reservations}
            />
        </ClientOnly>
    )
}

export default ListingPage

//6:55