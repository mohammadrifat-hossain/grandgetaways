'use client'
import React, { Suspense, useEffect, useState } from 'react'
import Container from '../Container'
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb'
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForest, GiIsland, GiWindmill } from 'react-icons/gi'
import { MdOutlineVilla } from 'react-icons/md'
import { FaSkiing } from 'react-icons/fa'
import { BsSnow } from 'react-icons/bs'
import { IoDiamond } from 'react-icons/io5'
import CategoryBox from '../CategoryBox'
import { usePathname, useSearchParams } from 'next/navigation'


export const categories = [
    {
        label:"Beach",
        icon: TbBeach,
        description: "This property is close to the beach!"
    },
    {
        label:"Windmills",
        icon: GiWindmill,
        description: "This property has windmills"
    },
    {
        label:"Modern",
        icon: MdOutlineVilla,
        description: "This property is Modern!"
    },
    {
        label:"Countryside",
        icon: TbMountain,
        description: "This property is in countryside!"
    },
    {
        label:"Pools",
        icon: TbPool,
        description: "This property has as pool!"
    },
    {
        label:"Islands",
        icon: GiIsland,
        description: "This property is on an Island!"
    },
    {
        label:"Lake",
        icon: GiBoatFishing,
        description: "This property is close to a Lake!"
    },
    {
        label:"Skiing",
        icon: FaSkiing,
        description: "This property has skiing activities!"
    },
    {
        label:"Castles",
        icon: GiCastle,
        description: "This property is in a Castle"
    },
    {
        label:"Camping",
        icon: GiForest,
        description: "This property has camping activities!"
    },
    {
        label:"Arctic",
        icon: BsSnow,
        description: "This property has Arctic activities!"
    },
    {
        label:"Cave",
        icon: GiCaveEntrance,
        description: "This property is in a Cave!"
    },
    {
        label:"Desert",
        icon: GiCactus,
        description: "This property is in desert!"
    },
    {
        label:"Barns",
        icon: GiBarn,
        description: "This property is in Bard!"
    },
    {
        label:"Lux",
        icon: IoDiamond,
        description: "This property is Luxurious!"
    },
]

const Categories = () => {
    const params = useSearchParams()
    const [category, setCategory] = useState<string | undefined>()
    useEffect(()=>{
        const categoryValue = params?.get('category');
        setCategory(categoryValue !== null ? categoryValue : undefined);
    },[params])
    const pathname = usePathname()

    const isMainPage = pathname === '/'

    if(!isMainPage){
        return null
    }

    
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Container>
                <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                    {
                        categories?.map((item)=>(
                            <CategoryBox key={item.label} label={item.label} icon={item.icon} description={item.description} selected={category === item.label} />
                        ))
                    }
                </div>
            </Container>
        </Suspense>
    )
}
export const dynamic = 'force-dynamic'

export default Categories