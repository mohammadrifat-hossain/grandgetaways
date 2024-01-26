
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from "@/components/listings/ListingCard";
import SecondListingCard from "@/components/listings/SecondListingCard";
import { SafeListing, SafeUser } from "@/types"

interface FavoriteClientProps{
    // listings?: {
    //     createdAt: () => string;
    //     id: string;
    //     title: string;
    //     description: string;
    //     imageSrc: string;
    //     category: string;
    //     roomCount: number;
    //     bathroomCount: number;
    //     guestCount: number;
    //     locationValue: string;
    //     userId: string;
    //     price: number;
    // }[];
    listings?: SafeListing[];
    currentUser?: SafeUser | null
}

const FavoriteClient: React.FC<FavoriteClientProps> = ({currentUser,listings}) => {
    return (
        <Container>
            <Heading
                title="Favorites"
                subtitle="List of places you have favorited!"
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {
                    listings?.map((listing)=>(
                        <ListingCard 
                            currentUser={currentUser}
                            key={listing.id}
                            data={listing}
                        />
                    ))
                }
            </div>
        </Container>
    )
}

export default FavoriteClient