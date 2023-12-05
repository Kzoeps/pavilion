import { sql } from "@vercel/postgres";
import { ReactNode } from "react";

export default async function NoteLayout({ children, params }: { params: { talkId: string }, children: ReactNode }) {
    const { talkId } = params
    const { rows } = await sql`SELECT title FROM talks WHERE id = ${talkId}`
    return (
        <>

            <section className=" my-6">
                <h1 className="text-3xl lg:text-4xl scroll-m-20 font-extrabold tracking-tight">{rows?.[0]?.title || 'Talk title here'}</h1>
                
                {children}
            </section>
        </>
    )
}