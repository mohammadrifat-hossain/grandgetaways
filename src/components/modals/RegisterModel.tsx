'use client'
import { AiFillGithub} from 'react-icons/ai'
import { FcGoogle} from 'react-icons/fc'
import {
    FieldValues,
    SubmitHandler,
    useForm,
} from 'react-hook-form'
import useRegisterModal from '@/hooks/useRegisterModal'
import { useCallback, useState } from 'react'
import axios from 'axios'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/Input'
import toast from 'react-hot-toast'
import Button from '../Button'
import { signIn } from 'next-auth/react'
import LoginModal from './LoginModal'
import useLoginModal from '@/hooks/useLoginModal'


const RegisterModel = () => {
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState:{
            errors
        }
    } = useForm<FieldValues>({
        defaultValues:{
            name: '',
            email:'',
            password:'',
        }
    })

    //----functions
    const onSubmit : SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        axios.post('/api/register', data)
            .then(()=>{
                registerModal.onClose()
            })
            .catch((error)=>{
                toast.error('Something went wrong!')
            })
            .finally(()=>{
                setIsLoading(false)
            })
    }

    const toggleContent = useCallback(()=>{
        registerModal.onClose()
        loginModal.onOpen()
    },[loginModal,registerModal])

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title='Welcome to GrandGetways'
                subtitle='Create an account!'
                
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
                id='name'
                label='Name'
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
                onClick={()=> signIn('google')}
            />
            <Button 
                outline
                label='Continue with Github'
                icon={AiFillGithub}
                onClick={()=> signIn("github")}
            />
            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className='flex flex-row items-center gap-2 justify-center'>
                    <div>Already have an account?</div>
                    <div onClick={toggleContent} className=' text-neutral-800 cursor-pointer hover:underline'>Login</div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal 
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title='Register'
            actionLabel='Continue'
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={FooterContent}
        />
    )
}

export default RegisterModel