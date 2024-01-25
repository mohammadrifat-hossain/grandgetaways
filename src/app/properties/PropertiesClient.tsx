'use client'

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import {  SafeListing, SafeReservation, SafeUser } from "@/types"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import Reser from '@/app/actions/getReservations'
import ListingCard from "@/components/listings/ListingCard";


interface TripsClientProps{
    listings?:  SafeListing[];
    currentUser?: SafeUser | null
}

const PropertiesClient:React.FC<TripsClientProps> = ({listings,currentUser}) => {
    const router = useRouter()
    const [deletingId, setDeletingId] = useState('')

    const onCancel = useCallback((id:string)=>{
        setDeletingId(id)
        axios.delete(`/api/listings/${id}`)
        .then(()=>{
            toast.success('Listing Deleted')
            router.refresh()
        })
        .catch((err: any)=>{
            toast.error(err?.response?.data?.error)
        })
        .finally(()=>{
            setDeletingId('')
        })
    },[router])

    return (
        <Container>
            <Heading
                title="Properties"
                subtitle="List of your properties"
            />
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {
                    listings?.map((listing)=>(
                        <ListingCard 
                            key={listing.id}
                            data={listing}
                            actionId={listing.id}
                            onAction={onCancel}
                            disabled={deletingId === listing.id}
                            actionLabel="Delete Property"
                            currentUser={currentUser}
                        />
                    ))
                }
            </div>
        </Container>
    )
}

export default PropertiesClient