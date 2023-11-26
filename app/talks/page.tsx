import { Suspense } from "react";
import TalksDisplay from "./components/talks-display";
import TalksFilter from "./components/talks-filter";

export default function Talks() {
    return (
        <>
            <main className="flex flex-col gap-4">
                <TalksFilter />
                <Suspense fallback={<div>Loading...</div>}>
                    <TalksDisplay />
                </Suspense>
            </main>
        </>
    )
}