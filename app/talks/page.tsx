import { Suspense } from "react";
import TalksDisplay from "./components/talks-display";
import TalksFilter from "./components/talks-filter";
import { Button } from "@/components/ui/button";
import AddTalkDialog from "./components/add-talk-dialog";

export default function Talks() {
    return (
        <>
            <main className="flex flex-col gap-4">
                <section className="flex justify-end items-center gap-4" >
                    <TalksFilter />
                    <AddTalkDialog />
                </section>

                <Suspense fallback={<div>Loading...</div>}>
                    <TalksDisplay />
                </Suspense>
            </main>
        </>
    )
}