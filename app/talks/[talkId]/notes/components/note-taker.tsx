'use client'
import { Suspense, useRef } from 'react';
import dynamic from 'next/dynamic';

const TextEditor = dynamic(() => import('./text-editor'), { ssr: false });
interface NoteTakerProps {
    talkId: string;
    noteId?: string;
    content?: string;
}

export default function NoteTaker({ talkId, noteId, content }: NoteTakerProps) {
    const debounceRef = useRef<any>(null)

    const onChange = (editorState: string) => {
        const jsonEditorState = editorState
        const data = {
            noteId,
            content: jsonEditorState,
            talk_id: talkId
        }
        if (debounceRef.current) {
            clearTimeout(debounceRef.current)
        }
        // we only call one api here since the post request creates if ID is not present and updates if ID is present; see the api for implementation
        debounceRef.current = setTimeout(() => {
            fetch('/api/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then((res) => {
                // console.log(res)
            })
        }, 2000)
    }
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <TextEditor initialState={content} onChange={onChange} />
            </Suspense>
        </>
    )
}