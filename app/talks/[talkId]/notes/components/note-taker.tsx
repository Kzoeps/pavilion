'use client'
import { $getRoot, $getSelection } from 'lexical';
import { useEffect } from 'react';

import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'

const onError = (e: any) => {
    console.log(e)
}

export default function NoteTaker() {
    const initConfig = {
        namespace: 'myEditor',
        onError,
    }
    const onChange = (editorState: any) => {
        console.log(editorState)
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