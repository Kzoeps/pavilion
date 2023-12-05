import { auth } from "@/app/auth";
import { PavilionSession } from "@/lib/types";
import { sql } from "@vercel/postgres";
import { APPROVED_BG_COLOR, UNAPPROVED_BG_COLOR } from "../lib/constants";

const renderProgress = (totalNotes: number, approvedNotes: number) => {
    return Array.from(Array(10)).map((_, i) => {
        // if first we need to round since borders are rounded also since approved and unapproved different color we need to handle differently
        if (i === 0) {
            if (i < approvedNotes) {
                return <div key={i} className={`col-span-1 bg-green-500 rounded-s-md`}></div>
            } else if (i < totalNotes) {
                return <div key={i} className={`col-span-1 bg-yellow-200 rounded-s-md`}></div>
            }
        } else if (i === 9) {
            // if last element we need to round right borders
            if (i < approvedNotes) {
                return <div key={i} className={`col-span-1 bg-green-500 rounded-e-md`}></div>
            } else if (i < totalNotes) {
                return <div key={i} className={`col-span-1 bg-yellow-200 rounded-e-md`}></div>
            }
        } else {
            // if neither first nor last they are simple rectangles
            if (i < approvedNotes) {
                return <div key={i} className={`col-span-1 bg-green-500`}></div>
            } else if (i < totalNotes) {
                return <div key={i} className={`col-span-1 bg-yellow-200`}></div>
            }
        }
    })
}

interface StudentProgressProps {
    id: string;
}
export default async function StudentProgress({ id }: StudentProgressProps) {
    const { rows } = await sql`SELECT COUNT(id), COUNT(approved) AS approved_count FROM notes WHERE student_id = ${id}`
    const totalNotes = +rows?.[0]?.count || 0;
    const approvedNotes = +rows?.[0]?.approved_count || 0;
    return (
        <>
            <div className="w-full grid grid-cols-10 h-6 bg-slate-400 rounded-md mt-2">
                {renderProgress(totalNotes, approvedNotes)}
            </div>
        </>
    )
}