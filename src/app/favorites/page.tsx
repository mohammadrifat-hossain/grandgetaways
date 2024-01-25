import ClientOnly from "@/components/ClientOnly"
import EmptyState from "@/components/EmptyState"
import getFavoriteListings from "../actions/getFavoriteListing"
import getCurrentUser from "../actions/getCurrentUser"
import FavoriteClient from "./FavoriteClient"

const FavoritePage = async () => {
    const listings = await getFavoriteListings()
    const currentUser = await getCurrentUser()

    const favoriteListing = listings.map(async (list) =>({
        ...list,
        createdAt: typeof list.createdAt
    }))

    if(listings.length === 0 ){
        return (
            <ClientOnly>
                <EmptyState 
                    title="No favorites found"
                    subtitle="Looks like you have no favorite listing."
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <FavoriteClient
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default FavoritePage