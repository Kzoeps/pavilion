'use client'
import { $getRoot, $getSelection } from 'lexical';
import { useEffect, useRef } from 'react';

import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'

const onError = (e: any) => {
    console.log(e)
}

interface NoteTakerProps {
    talkId: string;
    noteId?: string;
    content?: string;
}

export default function NoteTaker({talkId, noteId, content}: NoteTakerProps) {
    const debounceRef = useRef<any>(null)
    const initConfig: InitialConfigType = {
        namespace: 'myEditor',
        onError,
        editorState: noteId ? content : undefined
    }
    const onChange = (editorState: any) => {
        const jsonEditorState = JSON.stringify(editorState)
        const data = {
            content: jsonEditorState,
            talk_id: talkId
        }
        if (debounceRef.current) {
            clearTimeout(debounceRef.current)
        }
        debounceRef.current = setTimeout(() => {
            fetch('/api/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then((res) => {
                console.log(res)
            })
        }, 2000)
    }
    return (
        <>
            <section className='relative'>
                <LexicalComposer initialConfig={initConfig}>
                    <RichTextPlugin contentEditable={<ContentEditable className='w-full h-screen border-solid border-gray-500 border-2 pl-2' />} placeholder={<div className='absolute top-0 left-3'>enter terxt</div>} ErrorBoundary={LexicalErrorBoundary} />
                    <HistoryPlugin />
                    <OnChangePlugin onChange={onChange} />
                </LexicalComposer>
            </section>
        </>
    )
}