'use client'

import { SafeUser } from "@/types";
import { AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps{
    listingId?: string;
    currentUser?: SafeUser | null
}

const HeartButton: React.FC<HeartButtonProps> = ({listingId, currentUser}) => {
    const hasFavourite = false
    const toggleFavorite = () => {}
    return (
        <div onClick={toggleFavorite} className="relative hover:opacity-80 transition cursor-pointer w-full">
            <AiOutlineHeart size={28} className="fill-white absolute -top-[2px] right-[10px] block"/>
            <AiOutlineHeart size={24} className={`${hasFavourite ? 'fill-rose-500':'fill-neutral-500/70'} fill-white absolute top-[0] right-[12px] block`}/>
        </div>
    )
}

export default HeartButton