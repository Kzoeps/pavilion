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
    id: z.coerce.number().int().optional(),
    title: z.string(),
    location: z.string(),
    datetime: z.coerce.date().min(dayjs().startOf('day').toDate(), { message: "Event can't be in the past (No time travelling)" }),
    description: z.string()
})

const DeleteSchema = z.object({
    id: z.coerce.number().int()
})

const FilterSchema = z.object({
    year: z.coerce.number().int()
})

const ApprovalSchema = z.object({
    approved: z.literal('on').or(z.null())
})

export const addTalk = async (prevState: any, form: FormData) => {
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
    return { success: true, message: "Talk created successfully" }
}

export const updateTalk = async (prevState: any, form: FormData) => {
    const parsed = TalkSchema.parse({
        id: form.get('id'),
        title: form.get('title'),
        description: form.get('description'),
        datetime: form.get('datetime'),
        location: form.get('location')
    });

    await sql`UPDATE talks SET title = ${parsed.title}, description = ${parsed.description}, datetime = ${parsed.datetime.toISOString()}, location = ${parsed.location} WHERE id = ${parsed.id}`
    revalidatePath('/talks')
    return { success: true, message: "Talk updated successfully" }
}

export const deleteTalk = async (prevState: any, form: FormData) => {
    const parsed = DeleteSchema.parse({ id: form.get('id') })
    await sql`DELETE FROM talks WHERE id = ${parsed.id}`
    revalidatePath('/talks')
    return { success: true, message: "Talk deleted successfully" }
}

export const filterTalk = async (form: FormData) => {
    const parsed = FilterSchema.parse({ year: form.get('talkYear') })
    redirect(`/talks?year=${parsed.year}`)
}

export const approveTalk = async (id: string, prevState: any, form: FormData) => {
    const parsed = ApprovalSchema.parse({ approved: form.get('approved') })
    const approved = parsed.approved === 'on' ? true : false
    // the commented out statement doesn't seem to function properly
    // await sql`UPDATE notes SET approved = ${approved} WHERE id = ${id}`
    if (approved) {
        const res = await sql`UPDATE notes SET approved = 1 WHERE id = ${id} RETURNING id, approved`
        console.log(res)
        
    } else {
        const res = await sql`UPDATE notes SET approved = 0 WHERE id = ${id} RETURNING id, approved`
        console.log(res)
        
    }
    return { approved: true, success: true, message: 'Talk approved successfully' }
}