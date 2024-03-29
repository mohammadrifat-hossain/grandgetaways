import { create } from 'zustand'

interface SeacthModalStore{
    isOpen: boolean;
    onOpen:()=> void;
    onClose:()=> void;
}

const useSearchModal = create<SeacthModalStore>((set)=>({
    isOpen: false,
    onOpen: ()=> set({isOpen:true}),
    onClose: ()=> set({isOpen:false}),
}))

export default useSearchModal