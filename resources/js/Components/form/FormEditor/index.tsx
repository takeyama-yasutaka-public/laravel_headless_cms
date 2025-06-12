/*********************************
    インポート
*********************************/

import {
    insertAutoDetectedCodeBlock,
    lowlight,
    useEditorWithAutoDetect,
} from '@/lib/lowlight';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Underline from '@tiptap/extension-underline';
import { EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import 'highlight.js/styles/github-dark.css';
import { useCallback, useState } from 'react';
import styles from './index.module.scss';
// コンポーネント
import * as Action from '@/Components/action/index';
import * as Form from '@/Components/form/index';
//Font Awesome
import {
    faBold,
    faHeading,
    faImage,
    faItalic,
    faLink,
    faListOl,
    faListUl,
    faQuoteRight,
    faRedo,
    faStrikethrough,
    faUnderline,
    faUndo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/*********************************
    コンポーネントデータのエクスポート
*********************************/

export default function FormEditor({
    value,
    onChange,
}: {
    value: string;
    onChange: (val: string) => void;
}) {
    const [showImageModal, setShowImageModal] = useState(false);

    const CustomImage = Image.extend({
        addAttributes() {
            return {
                ...this.parent?.(),
                width: {
                    default: null,
                    parseHTML: (element) => element.getAttribute('width'),
                    renderHTML: (attributes) => {
                        if (!attributes.width) return {};
                        return {
                            width: attributes.width,
                        };
                    },
                },
                height: {
                    default: null,
                    parseHTML: (element) => element.getAttribute('height'),
                    renderHTML: (attributes) => {
                        if (!attributes.height) return {};
                        return {
                            height: attributes.height,
                        };
                    },
                },
            };
        },
    });

    const editor = useEditorWithAutoDetect({
        extensions: [
            StarterKit.configure({
                codeBlock: false,
            }),
            Underline,
            Link.configure({ openOnClick: false }),
            Image,
            HorizontalRule,
            Table.configure({ resizable: true }),
            TableRow,
            TableHeader,
            TableCell,
            CodeBlockLowlight.configure({
                lowlight,
                defaultLanguage: 'plaintext',
            }),
            CustomImage,
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    const setLink = useCallback(() => {
        const url = window.prompt('リンク先URLを入力してください');
        if (url) {
            editor?.chain().focus().setLink({ href: url }).run();
        }
    }, [editor]);

    const openImageModal = () => setShowImageModal(true);

    if (!editor) return null;

    return (
        <div className={styles.editor}>
            <div className={styles.editorUi}>
                <button
                    type="button"
                    title="見出し2"
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                >
                    <FontAwesomeIcon icon={faHeading} /> 2
                </button>
                <button
                    type="button"
                    title="見出し3"
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 3 }).run()
                    }
                >
                    <FontAwesomeIcon icon={faHeading} /> 3
                </button>
                <button
                    type="button"
                    title="太字"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    <FontAwesomeIcon icon={faBold} />
                </button>
                <button
                    type="button"
                    title="斜体"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    <FontAwesomeIcon icon={faItalic} />
                </button>
                <button
                    type="button"
                    title="下線"
                    onClick={() =>
                        editor.chain().focus().toggleUnderline().run()
                    }
                >
                    <FontAwesomeIcon icon={faUnderline} />
                </button>
                <button
                    type="button"
                    title="打ち消し線"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                >
                    <FontAwesomeIcon icon={faStrikethrough} />
                </button>
                <button
                    type="button"
                    title="区切り線"
                    onClick={() =>
                        editor.chain().focus().setHorizontalRule().run()
                    }
                >
                    ―
                </button>
                <button
                    type="button"
                    title="引用"
                    onClick={() =>
                        editor.chain().focus().toggleBlockquote().run()
                    }
                >
                    <FontAwesomeIcon icon={faQuoteRight} />
                </button>
                <button
                    type="button"
                    title="コードブロック"
                    onClick={() => insertAutoDetectedCodeBlock(editor)}
                >
                    {'</>'}
                </button>
                <Form.TablePopover editor={editor} />
                <button
                    type="button"
                    title="リスト"
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                >
                    <FontAwesomeIcon icon={faListUl} />
                </button>
                <button
                    type="button"
                    title="番号付きリスト"
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                >
                    <FontAwesomeIcon icon={faListOl} />
                </button>
                <button type="button" title="リンク" onClick={setLink}>
                    <FontAwesomeIcon icon={faLink} />
                </button>
                <button type="button" title="画像" onClick={openImageModal}>
                    <FontAwesomeIcon icon={faImage} />
                </button>
                <button
                    type="button"
                    title="元に戻る"
                    onClick={() => editor.chain().focus().undo().run()}
                >
                    <FontAwesomeIcon icon={faUndo} />
                </button>
                <button
                    type="button"
                    title="やり直し"
                    onClick={() => editor.chain().focus().redo().run()}
                >
                    <FontAwesomeIcon icon={faRedo} />
                </button>
                <button
                    type="button"
                    title="書式のクリア"
                    onClick={() => {
                        editor
                            .chain()
                            .focus()
                            .unsetAllMarks()
                            .clearNodes()
                            .run();
                    }}
                >
                    {'<p>'}
                </button>
            </div>
            <EditorContent editor={editor} className={styles.editorContent} />
            {editor && <Form.ImagePopover editor={editor} />}

            <Action.ImageModal
                key={showImageModal ? 'open' : 'closed'}
                active={showImageModal}
                onClose={() => setShowImageModal(false)}
                onSelect={(path) => {
                    editor?.chain().focus().setImage({ src: path }).run();
                }}
            />
        </div>
    );
}
