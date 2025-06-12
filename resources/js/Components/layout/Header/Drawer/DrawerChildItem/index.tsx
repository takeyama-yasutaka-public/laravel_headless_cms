/*********************************
    インポート
*********************************/

//スタイル
import styles from './index.module.scss';
//フック
import {
    useDrawerChildItemStore,
    useDrawerStore,
    useHeaderResetStore,
} from '@/lib/zustand';
import { useEffect, useRef, useState } from 'react';
//コンポーネント
import { Link } from '@inertiajs/react';
//Font Awesome
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/*********************************
    変数定義
*********************************/

type Props = {
    path?: string;
    title?: string;
    post?: boolean;
};

/*********************************
    コンポーネントデータのエクスポート
*********************************/

export default function DrawerChildItem({
    children,
    path = '/',
    title,
    post,
}: Readonly<{ children?: React.ReactNode }> & Props) {
    const [drawerGrandchildOpen, setDrawerGrandchildOpen] = useState(false);

    const refDrawerChildItem = useRef<HTMLLIElement>(null);
    const refDrawerGrandchild = useRef<HTMLUListElement>(null);

    const drawerDuration = useDrawerStore((state) => state.drawerDuration);
    const drawerState = useDrawerStore((state) => state.drawerState);
    const drawerChildItemState = useDrawerChildItemStore(
        (state) => state.drawerChildItemState,
    );
    const drawerWidthResetOn = useDrawerStore(
        (state) => state.drawerWidthResetOn,
    );
    const drawerChildItemOpen = useDrawerChildItemStore(
        (state) => state.drawerChildItemOpen,
    );
    const drawerChildItemClose = useDrawerChildItemStore(
        (state) => state.drawerChildItemClose,
    );
    const setDrawerGrandchildWidth = useDrawerChildItemStore(
        (state) => state.setDrawerGrandchildWidth,
    );
    const headerResetOn = useHeaderResetStore((state) => state.headerResetOn);
    const headerResetOff = useHeaderResetStore((state) => state.headerResetOff);

    const drawerGrandchildToggle = () => {
        const el = refDrawerGrandchild.current;
        const width = el!.getBoundingClientRect().width;

        if (!drawerChildItemState) {
            setDrawerGrandchildOpen((prev) => !prev);
            drawerChildItemOpen();
            setDrawerGrandchildWidth(width);
        } else if (drawerChildItemState && !drawerGrandchildOpen) {
            setDrawerGrandchildOpen((prev) => !prev);
        } else {
            setDrawerGrandchildOpen((prev) => !prev);
            drawerChildItemClose();

            el!.style.transition = `opacity ${drawerDuration}ms step-end, visibility ${drawerDuration}ms step-end`;
            setTimeout(() => {
                el!.style.removeProperty('transition');
            }, drawerDuration);
        }
    };

    const drawerGrandchildClose = () => {
        const el = refDrawerGrandchild.current;

        setDrawerGrandchildOpen((prev) => !prev);
        drawerChildItemClose();

        el!.style.transition = `opacity ${drawerDuration}ms step-end, visibility ${drawerDuration}ms step-end`;
        setTimeout(() => {
            el!.style.removeProperty('transition');
        }, drawerDuration);
    };

    //他の展開できるDropdownChildItemをクリックした時の処理
    useEffect(() => {
        const el = refDrawerChildItem.current;

        if (!el) return;

        const parent = el.parentElement;
        const buttons = parent?.querySelectorAll(':scope > li > button');
        buttons?.forEach(function (button) {
            if (
                button != parent?.querySelector(':scope > li > button') &&
                button != el.querySelector(':scope > button')
            ) {
                button.addEventListener('click', () => {
                    setDrawerGrandchildOpen(false);
                });
            }
        });
    }, [refDrawerChildItem]);

    //ドロワーを閉じた時の処理
    useEffect(() => {
        if (drawerChildItemState) {
            setTimeout(() => {
                setDrawerGrandchildOpen(false);
                drawerChildItemClose();
                drawerWidthResetOn();
            }, drawerDuration);
        }
    }, [drawerState]);

    //ウィンドウリサイズの処理
    useEffect(() => {
        window.addEventListener('resize', function () {
            if (window.matchMedia('(min-width:992px)').matches) {
                setDrawerGrandchildOpen(false);
            }
        });
    }, []);

    //DrawerItemの子メニューを閉じるクリックした時の処理
    useEffect(() => {
        const el = refDrawerChildItem.current;

        if (!el) return;

        const parent = el.parentElement;
        const backButton = parent?.querySelector(':scope > li > button');

        backButton!.addEventListener('click', () => {
            drawerChildItemClose();
            setTimeout(() => {
                setDrawerGrandchildOpen(false);
            }, drawerDuration);
        });
    }, [refDrawerChildItem]);

    //DrawerItemのメニュー展開ボタンをクリックした時の処理
    useEffect(() => {
        const el = refDrawerChildItem.current;

        if (!el) return;

        const drawerUl = el!.parentElement!.parentElement!.parentElement;
        const buttons = drawerUl?.querySelectorAll(':scope > li > button');
        buttons?.forEach(function (button) {
            button.addEventListener('click', () => {
                drawerChildItemClose();
                setTimeout(() => {
                    setDrawerGrandchildOpen(false);
                }, drawerDuration);
            });
        });
    }, [refDrawerChildItem]);

    //リンククリック時に初期化
    const headerReset = () => {
        headerResetOn();
        setTimeout(() => {
            headerResetOff();
        }, 0);
    };

    //コンポーネントの出力
    return (
        <>
            {children ? (
                <li className={styles.drawerChildItem} ref={refDrawerChildItem}>
                    <button
                        data-modifier={drawerGrandchildOpen ? 'active' : ''}
                        onClick={drawerGrandchildToggle}
                    >
                        {title}
                        <FontAwesomeIcon
                            icon={faAngleRight}
                            className={styles.icon}
                        />
                    </button>
                    <ul
                        className={styles.drawerGrandchild}
                        data-modifier={drawerGrandchildOpen ? 'active' : ''}
                        ref={refDrawerGrandchild}
                    >
                        <li>
                            <button
                                aria-label="孫メニューを閉じる"
                                onClick={drawerGrandchildClose}
                            >
                                <FontAwesomeIcon
                                    icon={faAngleLeft}
                                    className={styles.icon}
                                />
                            </button>
                        </li>
                        {children}
                    </ul>
                </li>
            ) : (
                <li className={styles.drawerChildItem}>
                    <Link
                        href={route(path)}
                        onClick={headerReset}
                        method={post ? 'post' : 'get'}
                        as={post ? 'button' : 'a'}
                    >
                        {title}
                    </Link>
                </li>
            )}
        </>
    );
}
