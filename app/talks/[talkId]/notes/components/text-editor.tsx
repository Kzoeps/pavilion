'use client'
import {
    AlignDropdown,
    BackgroundColorPicker,
    BoldButton,
    CodeFormatButton,
    Divider,
    Editor,
    EditorComposer,
    FontFamilyDropdown,
    InsertLinkButton,
    ItalicButton,
    TextColorPicker,
    TextFormatDropdown,
    ToolbarPlugin,
    UnderlineButton
} from 'verbum';
interface TextEditorProps {
    initialState?: string;
    isEditable?: boolean;
    onChange: (state: string) => void
}

export default function TextEditor({ initialState, onChange, isEditable = true }: TextEditorProps) {
    return (
        <>
            <EditorComposer initialEditorState={initialState}>
                <Editor isEditable={isEditable} onChange={onChange}>
                    {isEditable && <ToolbarPlugin>
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
                    </ToolbarPlugin>}
                </Editor>

            </EditorComposer>
        </>
    )
}
