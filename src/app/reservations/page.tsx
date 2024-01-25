import EmptyState from "@/components/EmptyState"
import getCurrentUser from "../actions/getCurrentUser"
import ClientOnly from "@/components/ClientOnly"
import getReservations from "../actions/getReservations"
import ReservationsClient from "./ReservationsClient"


const ReservationPage = async () => {
    const currentUser = await getCurrentUser()
    if(!currentUser){
        return(
            <ClientOnly>
                <EmptyState
                    title="Unauthorized"
                    subtitle="Please login"
                />
            </ClientOnly>
        )
    }

    const reservations = await getReservations({
        authorId: currentUser.id
    })
    if(reservations.length === 0){
        return(
            <ClientOnly>
                <EmptyState
                    title="No reservations found"
                    subtitle="looks like you have no reservations"
                />
            </ClientOnly>
        )
    }


    return (
        <ClientOnly>
            <ReservationsClient
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default ReservationPage