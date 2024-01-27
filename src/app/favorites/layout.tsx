import React, { Suspense } from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    //write a loading spinner
    const loadingSpinner = (
        <div className='w-full flex items-center justify-center'>
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        </div>
    )
    return <Suspense fallback={loadingSpinner}>
        {children}
    </Suspense>;
};


export default Layout