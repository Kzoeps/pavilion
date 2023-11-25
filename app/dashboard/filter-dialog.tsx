import { BasicUser } from "@/lib/types";
import { sql } from "@vercel/postgres";
import FilterForm from "./filter-form";
import { FilterParams } from "./utils/types";

// named filter dialog since intially it contained the dialog but nto anymore
export default async function UsersFilterDialog({ filterParams }: { filterParams: FilterParams }) {
    const { rows } = await sql<BasicUser>`SELECT id, name FROM users WHERE role = 'faculty'`
    return (
        <FilterForm faculty={rows} currentAdvisor={filterParams?.advisor_id} currentClassYear={filterParams?.class_year} />
    )
}