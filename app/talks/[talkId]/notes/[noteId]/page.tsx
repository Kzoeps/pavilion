import { NoteParams } from "@/app/talks/lib/types"
import { sql } from "@vercel/postgres"
import NoteTaker from "../components/note-taker"
import { Note } from "@/lib/types"

export default async function NotesEdit({ params }: { params: NoteParams }) {
    const { noteId, talkId } = params
    const { rows } = await sql<Note>`SELECT * FROM notes WHERE id = ${noteId}`
    return (
        <>
            <section>
                <NoteTaker talkId={talkId} content={JSON.stringify(rows[0].content)} noteId={noteId} />
            </section>
        </>
    )
}
