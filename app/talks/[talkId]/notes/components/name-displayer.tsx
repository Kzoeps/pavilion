import { Switch } from "@/components/ui/switch";
import { sql } from "@vercel/postgres";

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
            <section className="mt-4 flex justify-between items-center">
                <div>
                    <h3 className="scroll-m-20 text-2xl tracking-tight">{name} (Class of {classYear})</h3>
                    <p>{email}</p>
                </div>
                <div className="flex gap-3 items-center border border-solid rounded-full p-4">
                    <Switch className="data-[state=checked]:bg-green-500" />
                    <h4 className="text-xl">Approved</h4>
                </div>
            </section>
        </>
    )
} 