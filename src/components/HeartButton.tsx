'use client'

import useFavorite from "@/hooks/userFavorite";
import { SafeUser } from "@/types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps{
    listingId?: string;
    currentUser?: SafeUser | null
}

const HeartButton: React.FC<HeartButtonProps> = ({listingId, currentUser}) => {

    const { hasFavorited, toggleFavorite} = useFavorite({listingId, currentUser})
    
    return (
        <div onClick={toggleFavorite} className="relative hover:opacity-80 transition cursor-pointer w-full">
            <AiOutlineHeart size={28} className={`${hasFavorited ? 'fill-red-600 text-red-500':"fill-white"}  absolute -top-[2px] right-[10px] block`}/>
            <AiFillHeart size={24} className={`${hasFavorited ? 'fill-rose-500 text-red-500':'fill-neutral-500/70'}  absolute top-[0] right-[12px] block`}/>
        </div>
    )
}

export default HeartButton