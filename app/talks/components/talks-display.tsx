import TalksCard from "./talks-card";

export default function TalksDisplay() {
    return (
        <>
            <section className="grid gap-x-3 gap-y-8 grid-cols-3">
                <TalksCard />
                <TalksCard />
                <TalksCard />
                <TalksCard />
            </section>
        </>
    )
}