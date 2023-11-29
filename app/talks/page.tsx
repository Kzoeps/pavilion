import { Suspense } from "react";
import AddTalkDialog from "./components/add-talk-dialog";
import TalksDisplay from "./components/talks-display";
import TalksFilter from "./components/talks-filter";
import { Toaster } from "@/components/ui/toaster";

export default function Talks({ searchParams }: { searchParams: Record<string, string> }) {
    const year = searchParams?.year
    return (
        <>
            <main className="flex flex-col gap-4">
                <section className="flex justify-end items-center gap-4" >
                    <TalksFilter year={year} />
                    <Suspense fallback={<div>Loading...</div>}>
                        <AddTalkDialog />
                    </Suspense>
                </section>

                <Suspense fallback={<div>Loading...</div>}>
                    <TalksDisplay year={year} />
                </Suspense>
                <Toaster/>
            </main>
        </>
    )
}