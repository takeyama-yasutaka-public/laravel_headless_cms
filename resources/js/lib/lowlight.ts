/*********************************
    lowlight
*********************************/

import { Editor, useEditor } from '@tiptap/react';

import bash from 'highlight.js/lib/languages/bash';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import php from 'highlight.js/lib/languages/php';
import html from 'highlight.js/lib/languages/xml';
import { createLowlight } from 'lowlight';

export const lowlight = createLowlight();

lowlight.register('js', javascript);
lowlight.register('javascript', javascript);
lowlight.register('php', php);
lowlight.register('html', html);
lowlight.register('xml', html);
lowlight.register('css', css);
lowlight.register('json', json);
lowlight.register('bash', bash);

export function detectLanguage(code: string): string {
    const result = lowlight.highlightAuto(code);
    return result.data?.language || 'plaintext';
}

export function isLikelyCode(text: string): boolean {
    if (!text) return false;

    const lines = text.split('\n').filter((line) => line.trim() !== '');
    if (lines.length === 0) return false;

    const keywordPattern =
        /(const|let|var|function|return|if|else|for|while|class|public|private|=>|->|\{|;)/;
    const codeLikeLines = lines.filter((line) => keywordPattern.test(line));

    // 30%以上がコードっぽい or 1行だけでもキーワードがあるならコードとみなす
    return (
        codeLikeLines.length / lines.length >= 0.3 || codeLikeLines.length >= 1
    );
}

export const useEditorWithAutoDetect = (
    props: Parameters<typeof useEditor>[0],
) => {
    const editor = useEditor({
        ...props,
        editorProps: {
            ...props?.editorProps,
            handlePaste(view, event, slice) {
                const text = event.clipboardData?.getData('text/plain');
                const instance = editor;

                if (text && instance && isLikelyCode(text)) {
                    const lang = detectLanguage(text);
                    instance
                        .chain()
                        .focus()
                        .insertContent({
                            type: 'codeBlock',
                            attrs: { language: lang },
                            content: [{ type: 'text', text }],
                        })
                        .run();
                    return true;
                }

                return false;
            },
        },
    });

    return editor;
};

export const insertAutoDetectedCodeBlock = (editor: Editor | null) => {
    if (!editor) return;

    const { state } = editor;
    const selectedText = state.doc.textBetween(
        state.selection.from,
        state.selection.to,
        '\n',
    );

    const lang = selectedText ? detectLanguage(selectedText) : 'plaintext';

    editor
        .chain()
        .focus()
        .insertContent({
            type: 'codeBlock',
            attrs: { language: lang },
            content: selectedText ? [{ type: 'text', text: selectedText }] : [],
        })
        .run();
};
