'use client'

import { useEffect } from "react";
export default function Error({ error, reset }: { error: any; reset: () => void }) {
    useEffect(() => {
        console.log(error)
    }, [error])
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold text-center text-red-500">An Error Occurred</h1>
            <p className={"text-sm text-red-400"}>{error?.message}</p>
            <button onClick={reset} className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md">Go Back</button>
        </div>
    )
}