import { create } from 'zustand'

interface RendModelStore{
    isOpen: boolean;
    onOpen:()=> void;
    onClose:()=> void;
}

const useRentModal = create<RendModelStore>((set)=>({
    isOpen: false,
    onOpen: ()=> set({isOpen:true}),
    onClose: ()=> set({isOpen:false}),
}))

export default useRentModal