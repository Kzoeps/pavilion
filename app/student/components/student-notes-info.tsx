import { sql } from "@vercel/postgres";
import { APPROVED_BG_COLOR, UNAPPROVED_COLOR, APPROVED_COLOR, UNAPPROVED_BG_COLOR } from "../lib/constants";
import { getUnapprovedNotes } from "../lib/utils";
import { getNotesCount } from "../lib/sql-calls";

interface StudentNotesInfoProps {
    id: string;
}
export default async function StudentNotesInfo({ id }: StudentNotesInfoProps) {
    const { rows } = await getNotesCount(id)
    const approvedNotes = +rows?.[0]?.approved_count || 0
    const totalNotes = +rows?.[0]?.count || 0
    return (
        <>
            <h1 className="text-4xl font-bold mt-2">Progress: (<span className={`text-green-500`}>{approvedNotes}</span>+<span className={`text-yellow-300`}>{getUnapprovedNotes(totalNotes, approvedNotes)}</span>)/10</h1>
            <section className="flex gap-4 mt-4">
                <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 bg-${APPROVED_COLOR}`} />
                    <p>Approved Notes</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 ${UNAPPROVED_BG_COLOR}`} />
                    <p>Unapproved Notes</p>
                </div>
            </section>
        </>
    )
}