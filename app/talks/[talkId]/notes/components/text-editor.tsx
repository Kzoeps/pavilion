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
export default function TextEditor({ initialState, onChange }: { initialState?: string, onChange: (state: string) => void }) {
    return (
        <>
            <EditorComposer initialEditorState={initialState}>
                <Editor isEditable onChange={onChange}>
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
