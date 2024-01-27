import React, { Suspense } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const loadingSpinner = (
        <div className="w-full flex items-center justify-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        </div>
    );
    return (
        <Suspense fallback={loadingSpinner}>
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-screen flex flex-col justify-center items-center text-white">
            <h1 className="text-6xl font-bold mb-6">{`We'll be back soon!`}</h1>
            <p className="text-2xl mb-12 font-light text-center max-w-md">
            {`We're currently down for scheduled maintenance for this page. We should be back up
            and running soon! In the meantime, check out some of our other favorites sections.`}
            </p>
            {/* <div className="animate-spin inline-block w-24 h-24 border-8 border-solid rounded-full border-current border-r-transparent align-[-0.125em]"></div> */}
        </div>
        </Suspense>
    );
};

export default Layout;
