import { auth } from "@/app/auth";
import { PavilionUser } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { sql } from "@vercel/postgres";

const getUserId = async () => {
    const session = await auth()
    const user= session?.user as PavilionUser
    return user?.id;
}

export async function POST(req: NextRequest, res: NextResponse) {
    const userId = await getUserId()
    const { content, talk_id, noteId} = await req.json();
    const response = await sql`INSERT INTO notes (id, content, talk_id, student_id) VALUES (${noteId},${content}, ${talk_id}, ${userId}) ON CONFLICT (id) DO UPDATE SET content = ${content}`
    return Response.json({ message: "ok" })
}

export async function PATCH(req:NextRequest) {
    const userId = await getUserId() 
    const { content, talk_id, note_id } = await req.json();
    const response = await sql`UPDATE notes SET content = ${content} WHERE talk_id = ${talk_id} AND student_id = ${userId} AND id = ${note_id}`
    return Response.json({ message: "ok" })
}