"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: Props) {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                heading: false,
            }),
        ],
        content: value,
        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
    });

    if (!editor) return null;

    return (
        <div className="border rounded-lg overflow-hidden">
            <div className="flex gap-2 border-b bg-gray-50 p-2">
                <button onClick={() => editor.chain().focus().toggleBold().run()}
                    className={btn(editor.isActive("bold"))}>B</button>

                <button onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={btn(editor.isActive("italic"))}>I</button>

                <button onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={btn(editor.isActive("bulletList"))}>• List</button>

                <button onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={btn(editor.isActive("orderedList"))}>1. List</button>

                <button onClick={() => editor.chain().focus().undo().run()}
                    className="editor-btn">Undo</button>

                <button onClick={() => editor.chain().focus().redo().run()}
                    className="editor-btn">Redo</button>
            </div>

            <EditorContent
                editor={editor}
                className="p-3 min-h-[150px] prose max-w-none focus:outline-none"
            />
        </div>
    );
}

const btn = (active: boolean) =>
    `editor-btn ${active ? "bg-blue-100 text-blue-700" : ""}`;
