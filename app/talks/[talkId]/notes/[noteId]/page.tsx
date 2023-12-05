import { NoteParams } from "@/app/talks/lib/types"
import { sql } from "@vercel/postgres"
import NoteTaker from "../components/note-taker"
import { Note, PavilionSession, Roles } from "@/lib/types"
import { auth } from "@/app/auth"
import { PRIVILEGED_USERS } from "@/lib/constants"
import NameDisplayer from "../components/name-displayer"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/toaster"
import ApprovalSwitch from "../components/approval-switch"

export default async function NotesEdit({ params }: { params: NoteParams }) {
    const session = await auth() as PavilionSession
    const viewOnly = PRIVILEGED_USERS.includes(session?.user?.role as Roles)
    const canApprove = PRIVILEGED_USERS.includes(session?.user?.role as Roles)
    const { noteId, talkId } = params
    const { rows } = await sql<Note>`SELECT * FROM notes WHERE id = ${noteId}`
    return (
        <>
            <Suspense fallback={<p>Loading</p>}>
                <section className="mt-4 flex justify-between items-center">
                    <NameDisplayer studentId={rows[0].student_id.toString()} />
                    {canApprove && <ApprovalSwitch noteId={noteId} approved={rows[0]?.approved} />}
                </section>
            </Suspense>
            <section>
                <Suspense fallback={<p>Loading</p>}>
                    <NoteTaker isEditable={!viewOnly} talkId={talkId} content={JSON.stringify(rows[0].content)} noteId={noteId} />
                </Suspense>
            </section>
            <Toaster />
        </>
    )
}
