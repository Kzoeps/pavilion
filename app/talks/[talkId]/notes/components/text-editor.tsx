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
export default function TextEditor() {
    return (
        <>
            <EditorComposer>
                <Editor isEditable onChange={(state) => console.log('dasfads')}>
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