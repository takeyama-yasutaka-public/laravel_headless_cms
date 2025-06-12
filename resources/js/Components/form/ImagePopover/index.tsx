/*********************************
    インポート
*********************************/
import { offset, shift, useFloating } from '@floating-ui/react';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';

/*********************************
    型定義
*********************************/
type Props = {
    editor: any;
};

/*********************************
    コンポーネント
*********************************/
export default function ImagePopover({ editor }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [imagePos, setImagePos] = useState<number | null>(null);
    const [width, setWidth] = useState('');

    const { refs, floatingStyles } = useFloating({
        placement: 'top',
        middleware: [offset(5), shift()],
    });

    useEffect(() => {
        if (!editor) return;

        const update = () => {
            const { from, to } = editor.state.selection;

            let found = false;
            editor.state.doc.nodesBetween(from, to, (node: any, pos: any) => {
                if (node.type.name === 'image') {
                    setImagePos(pos);
                    setWidth(node.attrs.width || '');
                    found = true;

                    const dom = editor.view.nodeDOM(pos) as HTMLElement;
                    if (dom) {
                        refs.setReference(dom);
                    }
                }
            });

            setIsOpen(found);
            if (!found) {
                setImagePos(null);
            }
        };

        editor.on('selectionUpdate', update);
        update();

        return () => editor.off('selectionUpdate', update);
    }, [editor, refs]);

    const applyChanges = () => {
        if (imagePos === null) return;
        const attrs = editor.state.doc.nodeAt(imagePos)?.attrs ?? {};
        editor
            .chain()
            .focus()
            .command(({ tr }: { tr: any }) => {
                tr.setNodeMarkup(imagePos, undefined, {
                    ...attrs,
                    width,
                    height: null,
                });
                return true;
            })
            .run();
    };

    if (!isOpen || imagePos === null) return null;

    return (
        <div
            ref={refs.setFloating}
            style={floatingStyles}
            className={styles.imagePopover}
        >
            <div className={styles.popoverInputWrapper}>
                <label>幅(px):</label>
                <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                />
            </div>
            <div className={styles.popoverButtonWrapper}>
                <button type="button" onClick={applyChanges}>
                    サイズを変更
                </button>
            </div>
        </div>
    );
}
