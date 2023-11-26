import { Suspense } from "react";
import TalksDisplay from "./components/talks-display";
import TalksFilter from "./components/talks-filter";
import { Button } from "@/components/ui/button";

export default function Talks() {
    return (
        <>
            <main className="flex flex-col gap-4">
                <section className="flex justify-end items-center gap-4" >
                    <TalksFilter />
                    <Button>
                        Add Talk
                    </Button>

                </section>

                <Suspense fallback={<div>Loading...</div>}>
                    <TalksDisplay />
                </Suspense>
            </main>
        </>
    )
}