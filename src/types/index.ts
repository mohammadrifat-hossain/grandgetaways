import { Listing, Reservation, User } from "@prisma/client";

export type SafeListing = Omit<
    Listing,
    'createdAt'
> & {
    createdAt: string
}
export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
}

export type SafeReservation = Omit<
    Reservation,
    'createdAt'|'startDate'|'endDate'|'listing'
>&{
    createdAt: string;
    startDate: string;
    endDate: string;
    listing: SafeListing;
}

export type AnotherSafeReservation = Omit<
    Omit<
        {
            id: string;
            userId: string;
            listingId: string;
            startDate: Date;
            endDate: Date;
            totalPrice: number;
            createdAt: Date;
        },
        'listing' | 'startDate' | 'endDate' | 'createdAt'
    >,
    'listing'
> & {
    createdAt: string;
    startDate: string;
    endDate: string;
    listing: SafeListing;
};

export type ExtraListing = {
    createdAt: () => string;
    id: string;
    title: string;
    description: string;
    imageSrc: string;
    category: string;
    roomCount: number;
    bathroomCount: number;
    guestCount: number;
    locationValue: string;
    userId: string;
    price: number;
}