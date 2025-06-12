/*********************************
    インポート
*********************************/

import { flip, offset, shift, useFloating } from '@floating-ui/react';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import styles from './index.module.scss';

/*********************************
    変数定義
*********************************/

/*********************************
    コンポーネントデータのエクスポート
*********************************/

export default function TablePopover({ editor }: { editor: any }) {
    const [open, setOpen] = useState(false);
    const [cols, setCols] = useState(3);
    const [rows, setRows] = useState(3);

    const { refs, floatingStyles } = useFloating({
        placement: 'bottom-start',
        middleware: [offset(6), flip(), shift()],
    });

    const isEditing = editor?.isActive('table');

    const insertTable = () => {
        editor
            .chain()
            .focus()
            .insertTable({ rows, cols, withHeaderRow: true })
            .run();
        setOpen(false);
    };

    const tableActions = [
        {
            label: '列を右に追加',
            action: () => editor.chain().focus().addColumnAfter().run(),
        },
        {
            label: '列を左に追加',
            action: () => editor.chain().focus().addColumnBefore().run(),
        },
        {
            label: '行を下に追加',
            action: () => editor.chain().focus().addRowAfter().run(),
        },
        {
            label: '行を上に追加',
            action: () => editor.chain().focus().addRowBefore().run(),
        },
        {
            label: '列を削除',
            action: () => editor.chain().focus().deleteColumn().run(),
        },
        {
            label: '行を削除',
            action: () => editor.chain().focus().deleteRow().run(),
        },
        {
            label: 'テーブルを削除',
            action: () => editor.chain().focus().deleteTable().run(),
        },
        {
            label: 'セルを結合',
            action: () => editor.chain().focus().mergeCells().run(),
        },
        {
            label: 'セルを分割',
            action: () => editor.chain().focus().splitCell().run(),
        },
        {
            label: '最初の行をヘッダーに',
            action: () => editor.chain().focus().toggleHeaderRow().run(),
        },
        {
            label: '最初の列をヘッダーに',
            action: () => editor.chain().focus().toggleHeaderColumn().run(),
        },
    ];

    return (
        <>
            <button
                type="button"
                title="テーブル"
                ref={refs.setReference}
                onClick={() => setOpen((prev) => !prev)}
                className={styles.popoverButton}
            >
                <FontAwesomeIcon icon={faTable} />
            </button>

            {open && (
                <div
                    ref={refs.setFloating}
                    style={floatingStyles}
                    className={styles.popover}
                >
                    {isEditing ? (
                        <div className={styles.popoverEditing}>
                            {tableActions.map(({ label, action }) => (
                                <button
                                    type="button"
                                    key={label}
                                    onClick={() => {
                                        action();
                                        setOpen(false);
                                    }}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.popoverInsert}>
                            <div className={styles.popoverInputWrapper}>
                                <label>列数</label>
                                <input
                                    type="number"
                                    min={1}
                                    max={10}
                                    value={cols}
                                    onChange={(e) =>
                                        setCols(Number(e.target.value))
                                    }
                                />
                            </div>
                            <div className={styles.popoverInputWrapper}>
                                <label>行数</label>
                                <input
                                    type="number"
                                    min={1}
                                    max={20}
                                    value={rows}
                                    onChange={(e) =>
                                        setRows(Number(e.target.value))
                                    }
                                />
                            </div>
                            <button type="button" onClick={insertTable}>
                                テーブルを挿入
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
