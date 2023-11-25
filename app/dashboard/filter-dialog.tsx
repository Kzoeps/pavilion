import { BasicUser } from "@/lib/types";
import { sql } from "@vercel/postgres";
import ClassYearFilter from "./class-year-filter";

// named filter dialog since intially it contained the dialog but nto anymore
export default async function UsersFilterDialog({ filterParams }: { filterParams: { advisor_id?: string, class_year?: string } }) {
    const { rows } = await sql<BasicUser>`SELECT id, name FROM users WHERE role = 'faculty'`
    return (
        <ClassYearFilter faculty={rows} currentAdvisor={filterParams?.advisor_id} currentClassYear={filterParams?.class_year} />
    )
}