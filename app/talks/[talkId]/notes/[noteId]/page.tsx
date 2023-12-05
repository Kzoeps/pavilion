import { NoteParams } from "@/app/talks/lib/types"
import { sql } from "@vercel/postgres"
import NoteTaker from "../components/note-taker"
import { Note, PavilionSession, Roles } from "@/lib/types"
import { auth } from "@/app/auth"
import { PRIVILEGED_USERS } from "@/lib/constants"
import NameDisplayer from "../components/name-displayer"
import { Suspense } from "react"

export default async function NotesEdit({ params }: { params: NoteParams }) {
    const session = await auth() as PavilionSession
    const viewOnly = PRIVILEGED_USERS.includes(session?.user?.role as Roles)
    const { noteId, talkId } = params
    const { rows } = await sql<Note>`SELECT * FROM notes WHERE id = ${noteId}`
    return (
        <>
            <Suspense fallback={<p>Loading</p>}>
                <NameDisplayer studentId={rows[0].student_id.toString()} />
            </Suspense>
            <section>
                <Suspense fallback={<p>Loading</p>}>
                    <NoteTaker isEditable={!viewOnly} talkId={talkId} content={JSON.stringify(rows[0].content)} noteId={noteId} />
                </Suspense>
            </section>
        </>
    )
}
