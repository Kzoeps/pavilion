import { auth } from "@/app/auth";
import { PavilionUser } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { sql } from "@vercel/postgres";

export async function POST(req: NextRequest, res: NextResponse) {
    const session = await auth()
    const user= session?.user as PavilionUser
    const noteId = uuid()
    const { id, role } = user
    const { content, talk_id} = await req.json();
    // const response = await sql`INSERT INTO notes (id, content, talk_id, student_id) VALUES (${noteId},${content}, ${talk_id}, ${id})`
    // console.log(response)
    return Response.json({ message: "ok" })
}