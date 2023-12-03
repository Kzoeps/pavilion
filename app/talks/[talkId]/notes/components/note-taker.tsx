'use client'
import { useEffect, useRef, useState } from 'react';

import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { EditorComposer, Editor, ToolbarPlugin, FontFamilyDropdown, Divider, BoldButton, ItalicButton, UnderlineButton, CodeFormatButton, InsertLinkButton, TextColorPicker, BackgroundColorPicker, TextFormatDropdown, AlignDropdown } from 'verbum';
import TextEditor from './text-editor';
// import { AlignDropdown, BackgroundColorPicker, BoldButton, CodeFormatButton, Divider, Editor, EditorComposer, FontFamilyDropdown, InsertLinkButton, ItalicButton, TextColorPicker, TextFormatDropdown, ToolbarPlugin, UnderlineButton } from 'verbum';

const onError = (e: any) => {
    console.log(e)
}

interface NoteTakerProps {
    talkId: string;
    noteId?: string;
    content?: string;
}

export default function NoteTaker({ talkId, noteId, content }: NoteTakerProps) {
    const debounceRef = useRef<any>(null)
    const initConfig: InitialConfigType = {
        namespace: 'myEditor',
        onError,
        editorState: content
    }


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
                console.log(res)
            })
        }, 2000)
    }
    return (
        <>
            {/* <section className='relative'>
                <LexicalComposer initialConfig={initConfig}>
                    <RichTextPlugin contentEditable={<ContentEditable className='w-full h-screen border-solid border-gray-500 border-2 pl-2' />} placeholder={<div className='absolute top-0 left-3'>enter terxt</div>} ErrorBoundary={LexicalErrorBoundary} />
                    <HistoryPlugin />
                    <OnChangePlugin onChange={onChange} />
                </LexicalComposer>
            </section> */}
            <EditorComposer initialEditorState={content} >
                <Editor onChange={(state) => onChange(state)}>
                    <ToolbarPlugin>
                        <FontFamilyDropdown />
                        <Divider />
                        <BoldButton />
                        <ItalicButton />
                        <UnderlineButton />
                        <CodeFormatButton />
                        <InsertLinkButton />
                        <TextColorPicker />
                        <BackgroundColorPicker />
                        <TextFormatDropdown />
                        <Divider />
                        <AlignDropdown />
                    </ToolbarPlugin>
                </Editor>

            </EditorComposer> 
        </>
    )
}