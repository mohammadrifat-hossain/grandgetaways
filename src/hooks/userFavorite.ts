import { SafeUser } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import useLoginModal from "./useLoginModal";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";


interface IUseFavorit {
    listingId?: string;
    currentUser?: SafeUser | null;
}

const useFavorite = ({listingId,currentUser}:IUseFavorit) =>{
    const router = useRouter()
    const loginModal = useLoginModal();

    const hasFavorited = useMemo(()=>{
        const list = currentUser?.favoriteIds || []

        if(listingId){
            return list.includes(listingId)
        }
    },[currentUser,listingId])

    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>)=>{
        e.stopPropagation()

        if(!currentUser){
            return loginModal.onOpen()
        }

        try {
            let request;
            if(hasFavorited){
                request = () => axios.delete(`/api/favorits/${listingId}`)
            }else{
                request = () => axios.post(`/api/favorits/${listingId}`)
            }

            await request()

            router.refresh()
            toast.success("success")
        } catch (error: any) {
            toast.error(error.message)
        }
    },[currentUser, loginModal, hasFavorited, listingId, router])

    return{
        hasFavorited,
        toggleFavorite
    }
}

export default useFavorite