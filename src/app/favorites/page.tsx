import ClientOnly from "@/components/ClientOnly"
import EmptyState from "@/components/EmptyState"
import getFavoriteListings from "../actions/getFavoriteListing"
import getCurrentUser from "../actions/getCurrentUser"
import FavoriteClient from "./FavoriteClient"
import { SafeListing } from "@/types"

const FavoritePage = async () => {
    const listings = await getFavoriteListings()
    const currentUser = await getCurrentUser()

    const favoriteListingPromises = listings.map(async (list) =>({
        ...list,
        createdAt: typeof list.createdAt
    }))
    const favoriteListing = await Promise.all(favoriteListingPromises);

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
                listings={favoriteListing}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default FavoritePage