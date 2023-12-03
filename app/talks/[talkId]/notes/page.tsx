import { auth } from "@/app/auth";
import NoteTaker from "./components/note-taker";
import { PavilionUser } from "@/lib/types";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { BaseTalkParams } from "../../lib/types";
import { v4 as uuid } from 'uuid';
import { Suspense } from "react";
import TextEditor from "./components/text-editor";


/**
 * The flow of note taking is as follows:
 * 1. User clicks on a talk card
 * 2. User is redirected to /talks/[talkId]/notes
 * 3. We query the database to see if the user has a note for this talk
 * 4. If the user has a note then we set the noteId to the id of the note and the content of the note as well which gets passed to the note taker
 * 5. we set a default noteId to a uuid and the content to undefined since if there is no note for the existing talk then note taker will create a new note using the ID we provide when the user writes something
 * 6. So as to maintain this noteId we pass it from this component so that note taker can use it to update the note as well. 
 * @returns 
 */
export default async function TalksNotes({ params }: { params: BaseTalkParams }) {
    const { talkId } = params
    const session = await auth()
    const user = session?.user as PavilionUser
    let content: string | undefined = undefined;
    let noteId = uuid()
    // TODO: check if is student if not redirect to /talks
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
                {/* <TextEditor/> */}
                <NoteTaker noteId={noteId} content={content} talkId={talkId} />
            </Suspense>
        </>
    )
}