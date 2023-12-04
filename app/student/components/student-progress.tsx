import { auth } from "@/app/auth";
import { PavilionSession } from "@/lib/types";
import { sql } from "@vercel/postgres";
import { APPROVED_BG_COLOR, UNAPPROVED_BG_COLOR } from "../lib/constants";

const renderProgress = (totalNotes: number, approvedNotes: number) => {
    return Array.from(Array(10)).map((_, i) => {
        // if first we need to round since borders are rounded also since approved and unapproved different color we need to handle differently
        if (i === 0) {
            if (i < approvedNotes) {
                return <div key={i} className={`col-span-1 ${APPROVED_BG_COLOR} rounded-s-md`}></div>
            } else if (i < totalNotes) {
                return <div key={i} className={`col-span-1 ${UNAPPROVED_BG_COLOR} rounded-s-md`}></div>
            }
        } else if (i === 9) {
            // if last element we need to round right borders
            if (i < approvedNotes) {
                return <div key={i} className={`col-span-1 ${APPROVED_BG_COLOR} rounded-e-md`}></div>
            } else if (i < totalNotes) {
                return <div key={i} className={`col-span-1 ${UNAPPROVED_BG_COLOR} rounded-e-md`}></div>
            }
        } else {
            // if neither first nor last they are simple rectangles
            if (i < approvedNotes) {
                return <div key={i} className={`col-span-1 ${APPROVED_BG_COLOR}`}></div>
            } else if (i < totalNotes) {
                return <div key={i} className={`col-span-1 ${UNAPPROVED_BG_COLOR}`}></div>
            }
        }
    })
}

interface StudentProgressProps {
    id: string;
}
export default async function StudentProgress({ id }: StudentProgressProps) {
    const session = await auth() as PavilionSession;
    const { rows } = await sql`SELECT COUNT(id) FROM notes WHERE student_id = ${id}`
    const totalNotes = +rows?.[0]?.count || 0;
    const approvedNotes = 0;
    return (
        <>
            <div className="w-full grid grid-cols-10 h-6 bg-slate-400 rounded-md mt-2">
                {renderProgress(totalNotes, approvedNotes)}
            </div>
        </>
    )
}