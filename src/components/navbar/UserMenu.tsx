'use client'
import React, { useCallback, useState } from 'react'
import { AiOutlineMenu} from 'react-icons/ai'
import Avater from '../Avater'
import MenuItem from './MenuItem'
import useRegisterModal from '@/hooks/useRegisterModal'
import useLoginModal from '@/hooks/useLoginModal'
import { signOut } from 'next-auth/react'
import { SafeUser } from '@/types'
import useRentModal from '@/hooks/useRentModal'

interface UserMenuProps {
    currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({currentUser}) => {
    const registerModel = useRegisterModal()
    const loginModel = useLoginModal()
    const rentModal = useRentModal()
    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = useCallback(()=>{
        setIsOpen(!isOpen)
    },[isOpen])

    //----functions

    const onRent = useCallback(()=>{
        if(!currentUser){
            return loginModel.onOpen()
        }
        //open rent modal
        rentModal.onOpen()
    },[currentUser,loginModel,rentModal])
    return (
        <div className='relative'>
            <div className='flex flex-row items-center gap-3'>
                <div onClick={onRent} className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer' >
                    Grand your home
                </div>
                <div onClick={toggleOpen} className='p-4 md:py-2 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'>
                    <AiOutlineMenu/>
                    <div className='hidden md:block'>
                        <Avater src={currentUser?.image}/>
                    </div>
                </div>
            </div>
            {
                isOpen && (
                    <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
                        <div className='flex flex-col cursor-pointer'>
                            {
                                currentUser ? (
                                    <>
                                        <MenuItem onClick={()=>{}} label='Trips'/>
                                        <MenuItem onClick={()=>{}} label='Favorite'/>
                                        <MenuItem onClick={()=>{}} label='Reservations'/>
                                        <MenuItem onClick={()=>{}} label='Properties'/>
                                        <MenuItem onClick={rentModal.onOpen} label='My Home'/>
                                        <hr />
                                        <MenuItem onClick={()=> signOut()} label='Logout'/>

                                    </>
                                ):(
                                    <>
                                        <MenuItem onClick={loginModel.onOpen} label='Login'/>
                                        <MenuItem onClick={registerModel.onOpen} label='SignUp'/>
                                    </>
                                )
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default UserMenu