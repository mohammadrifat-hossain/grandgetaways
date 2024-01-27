import ClientOnly from "@/components/ClientOnly"
import EmptyState from "@/components/EmptyState"
import getFavoriteListings from "../actions/getFavoriteListing"
import getCurrentUser from "../actions/getCurrentUser"
import FavoriteClient from "./FavoriteClient"
import { SafeListing } from "@/types"
import { Suspense } from "react"

const FavoritePage = async () => {
    const listings = await getFavoriteListings()
    const currentUser = await getCurrentUser()

    const favoriteListingPromises = listings.map(async (list) =>({
        ...list,
        createdAt: typeof list.createdAt
    }))
    const favoriteListing = await Promise.all(favoriteListingPromises);

    const loadingSpinner = (
        <div className="w-full flex items-center justify-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        </div>
    );

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
        <Suspense fallback={loadingSpinner}>
            <FavoriteClient
                listings={favoriteListing}
                currentUser={currentUser}
            />
        </Suspense>
    )
}

export default FavoritePage