import { auth } from "@/app/auth";
import NoteTaker from "./components/note-taker";
import { PavilionUser } from "@/lib/types";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { BaseTalkParams } from "../../lib/types";
import { v4 as uuid } from 'uuid';
import { Suspense } from "react";


export default async function TalksNotes({ params }: { params: BaseTalkParams }) {
    const { talkId } = params
    const session = await auth()
    const user = session?.user as PavilionUser
    let content: string | undefined = undefined;
    let noteId = uuid()
    if (user) {
        const { rows } = await sql`SELECT id, content FROM notes WHERE student_id = ${user.id} AND talk_id = ${talkId}`
        if (rows.length > 0) {
            noteId = rows[0].id
            content = JSON.stringify(rows[0].content)
            console.log(rows)
        }
    }
    console.log(noteId, content)
    return (
        <>
            <Suspense fallback={<p>loading</p>}>
                <NoteTaker noteId={noteId} content={content} talkId={talkId} />
            </Suspense>
        </>
    )
}