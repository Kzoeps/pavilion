import { NoteParams } from "@/app/talks/lib/types"
import { sql } from "@vercel/postgres"
import NoteTaker from "../components/note-taker"
import { Note, PavilionSession, Roles } from "@/lib/types"
import { auth } from "@/app/auth"
import { PRIVILEGED_USERS } from "@/lib/constants"

export default async function NotesEdit({ params }: { params: NoteParams }) {
    const session = await auth() as PavilionSession
    const viewOnly = PRIVILEGED_USERS.includes(session?.user?.role as Roles)
    const { noteId, talkId } = params
    const { rows } = await sql<Note>`SELECT * FROM notes WHERE id = ${noteId}`
    return (
        <>
            <section>
                <NoteTaker isEditable={!viewOnly} talkId={talkId} content={JSON.stringify(rows[0].content)} noteId={noteId} />
            </section>
        </>
    )
}
