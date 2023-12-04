const APPROVED_COLOR = 'green-500';
const UNAPPROVED_COLOR = 'yellow-100';
const APPROVED_BG_COLOR = `bg-${APPROVED_COLOR}`;
const UNAPPROVED_BG_COLOR = `bg-${UNAPPROVED_COLOR}`;

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

const getUnapprovedNotes = (totalNotes: number, approvedNotes: number) => {
    return totalNotes - approvedNotes;
}

interface StudentProgressProps {
    totalNotes: number;
    approvedNotes: number;
}
export default function StudentProgress({ totalNotes, approvedNotes }: StudentProgressProps) {
    return (
        <>
            <h1 className="text-4xl font-bold mt-2">Progress: (<span className={`text-${APPROVED_COLOR}`}>{approvedNotes}</span>+<span className={`text-yellow-300`}>{getUnapprovedNotes(totalNotes, approvedNotes)}</span>)/10</h1>
            <section className="flex gap-4 mt-4">
                <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 ${APPROVED_BG_COLOR}`} />
                    <p>Approved Notes</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 ${UNAPPROVED_BG_COLOR}`} />
                    <p>Unapproved Notes</p>
                </div>
            </section>
            <div className="w-full grid grid-cols-10 h-6 bg-slate-400 rounded-md mt-2">
                {renderProgress(totalNotes, approvedNotes)}
            </div>
        </>
    )
}