'use server'

import { auth } from "@/app/auth"
import { PavilionUser } from "@/lib/types"
import { sql } from "@vercel/postgres"
import dayjs from "dayjs"
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
// import { redirect } from "next/navigation"
import { z } from "zod"

dayjs.extend(utc)
dayjs.extend(timezone)

const TalkSchema = z.object({
    title: z.string(),
    location: z.string(),
    datetime: z.coerce.date().min(dayjs().startOf('day').toDate(), { message: "Event can't be in the past (No time travelling)" }),
    description: z.string()
})

const FilterSchema = z.object({
    year: z.coerce.number().int()
})

export const addTalk = async (form: FormData) => {
    const session = await auth()
    const parsed = TalkSchema.parse({
        title: form.get('title'),
        description: form.get('description'),
        datetime: form.get('datetime'),
        location: form.get('location')
    });
    if ((session?.user as PavilionUser)?.id) {
        await sql`INSERT INTO talks (title, description, datetime, location, creator_id) VALUES (${parsed.title}, ${parsed.description}, ${parsed.datetime.toISOString()}, ${parsed.location}, ${(session?.user as PavilionUser).id})`
    }
    revalidatePath('/talks')
}

export const filterTalk = async (form: FormData) => {
    const parsed = FilterSchema.parse({ year: form.get('talkYear') })
    redirect(`/talks?year=${parsed.year}`)
}