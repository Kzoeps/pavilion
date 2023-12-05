import { auth } from "@/app/auth";
import { Switch } from "@/components/ui/switch";
import { PRIVILEGED_USERS } from "@/lib/constants";
import { PavilionSession, Roles } from "@/lib/types";
import { sql } from "@vercel/postgres";
import ApprovalSwitch from "./approval-switch";

interface NameDisplayerProps {
    studentId: string;
}
export default async function NameDisplayer({ studentId }: NameDisplayerProps) {
    const { rows } = await sql`SELECT name, class_year, email FROM users WHERE id = ${studentId}`
    const name = rows?.[0]?.name || 'Name here'
    const classYear = rows?.[0]?.class_year || 'Class year here'
    const email = rows?.[0]?.email || 'Email here'
    return (
        <>
                <div className="">
                    <h3 className="scroll-m-20 text-2xl tracking-tight">{name} (Class of {classYear})</h3>
                    <p>{email}</p>
                </div>
        </>
    )
} 