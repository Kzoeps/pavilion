'use server'

import { revalidatePath } from "next/cache"
import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { z } from "zod"
import { auth } from "@/app/auth"
import { sql } from "@vercel/postgres"
import { PavilionUser } from "@/lib/types"

dayjs.extend(utc)
dayjs.extend(timezone)

const TalkSchema = z.object({
    title: z.string(),
    location: z.string(),
    datetime: z.coerce.date().min(dayjs().startOf('day').toDate(), { message: "Event can't be in the past (No time travelling)" }),
    description: z.string()
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