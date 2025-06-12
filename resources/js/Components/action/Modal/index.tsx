//クライアントコンポーネントへ変更
'use client';

/*********************************
    インポート
*********************************/

//フック
import { bodyScrollStart, bodyScrollStop } from '@/lib/bodyScroll';
import { useEffect, useRef, useState } from 'react';
//スタイル
import styles from './index.module.scss';
//Font Awesome
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/*********************************
    変数定義
*********************************/

type Props = {
    active: boolean;
    onClose: () => void;
};

/*********************************
    コンポーネントデータのエクスポート
*********************************/

export function Modal({
    children,
    active,
    onClose,
}: Readonly<{ children: React.ReactNode }> & Props) {
    const [isActive, setIsActive] = useState(false);

    const refModal = useRef<HTMLDialogElement>(null);
    const refModalBox = useRef<HTMLDivElement>(null);

    // モーダルの開閉処理
    useEffect(() => {
        setIsActive(active);
    }, [active]);

    // 開閉に伴う処理
    useEffect(() => {
        const el = refModal.current;

        if (isActive) {
            el!.showModal();
            bodyScrollStop();
        } else {
            el!.close();
            bodyScrollStart();
        }
    }, [isActive]);

    // 閉じるボタンの処理
    const clickButton = () => {
        onClose();
    };

    // オーバーレイクリック時の処理
    const clickDialog = (e: any) => {
        const el = refModalBox.current;

        if (e.contains(el)) {
            onClose();
        }
    };

    // Escapeボタンを押したときの時の処理
    useEffect(() => {
        const escape = (e: any) => {
            if (e.key == 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', escape);

        return () => {
            document.removeEventListener('keydown', escape);
        };
    }, []);

    //コンポーネントの出力
    return (
        <dialog
            className={styles.modal}
            data-modifier={isActive ? 'active' : ''}
            onClick={(e) => {
                clickDialog(e.target);
            }}
            ref={refModal}
        >
            <div className={styles.box} ref={refModalBox}>
                <div className={styles.inner}>{children}</div>
                <button
                    type="button"
                    className={styles.close}
                    onClick={clickButton}
                    aria-label="モーダルを閉じる"
                >
                    <FontAwesomeIcon icon={faXmark} className={styles.icon} />
                </button>
            </div>
        </dialog>
    );
}

export function ModalHeader({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    //コンポーネントの出力
    return <div className={styles.modalHeader}>{children}</div>;
}

export function ModalBody({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    //コンポーネントの出力
    return <div className={styles.modalBody}>{children}</div>;
}

export function ModalFooter({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    //コンポーネントの出力
    return <div className={styles.modalFooter}>{children}</div>;
}
