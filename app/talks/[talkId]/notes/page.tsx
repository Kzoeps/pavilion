import { auth } from "@/app/auth";
import NoteTaker from "./components/note-taker";
import { PavilionUser } from "@/lib/types";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { BaseTalkParams } from "../../lib/types";


export default async function TalksNotes({ params }: { params: BaseTalkParams }) {
    const { talkId } = params
    const session = await auth()
    const user = session?.user as PavilionUser
    if (user) {
        const { rows } = await sql`SELECT id FROM notes WHERE student_id = ${user.id} AND talk_id = ${talkId}`
        if (rows.length > 0) {
            redirect(`/talks/${talkId}/notes/${rows[0].id}`)
        }
    }
    return (
        <>
            <NoteTaker talkId={talkId} />
        </>
    )
}