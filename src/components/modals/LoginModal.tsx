'use client'
import { AiFillGithub} from 'react-icons/ai'
import { FcGoogle} from 'react-icons/fc'
import {
    FieldValues,
    SubmitHandler,
    useForm,
} from 'react-hook-form'
import useRegisterModal from '@/hooks/useRegisterModal'
import { useState } from 'react'
import axios from 'axios'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/Input'
import toast from 'react-hot-toast'
import Button from '../Button'
import useLoginModal from '@/hooks/useLoginModal'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'


const LoginModal = () => {
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState:{
            errors
        }
    } = useForm<FieldValues>({
        defaultValues:{
            email:'',
            password:'',
        }
    })

    //----functions
    const onSubmit : SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        signIn('credentials',{
            ...data,
            redirect: false
        })
        .then((callback)=>{
            setIsLoading(false)
            if(callback?.ok){
                toast.success('Logged In')
                router.refresh()
                loginModal.onClose()
            }

            if(callback?.error){
                toast.error(callback.error)
            }
        })
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title='Welcome Back!'
                subtitle='Login to your Account!'
                
            />
            <Input 
                id='email'
                label='Email'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input 
                id='password'
                type='password'
                label='Password'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const FooterContent = (
        <div className='flex flex-col gap-4 mt-3 '>
            <hr />
            <Button 
                outline
                label='Continue with Google'
                icon={FcGoogle}
                onClick={()=>{}}
            />
            <Button 
                outline
                label='Continue with Github'
                icon={AiFillGithub}
                onClick={()=>{}}
            />
            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className='flex flex-row items-center gap-2 justify-center'>
                    <div>Already have an account?</div>
                    <div onClick={registerModal.onClose} className=' text-neutral-800 cursor-pointer hover:underline'>Login</div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal 
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title='Login'
            actionLabel='Continue'
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={FooterContent}
        />
    )
}

export default LoginModal