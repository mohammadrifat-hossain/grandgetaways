'use client'

import EmptyState from "@/components/EmptyState"
import { useEffect } from "react"

interface ErrorStateProps{
    error: Error
}

const ErrorState: React.FC<ErrorStateProps> = ({error}) => {
    useEffect(()=>{
        console.log(error);
    },[error])
    return (
        <EmptyState
            title="Oh no"
            subtitle="Something went wrong!"
        />
    )
}

export default ErrorState