/*********************************
    インポート
*********************************/

//スタイル
import styles from './index.module.scss';
//フック
import {
    useDrawerItemStore,
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

export default function DrawerItem({
    children,
    path = '/',
    title,
    post,
}: Readonly<{ children?: React.ReactNode }> & Props) {
    const [drawerChildOpen, setDrawerChildOpen] = useState(false);

    const refDrawerItem = useRef<HTMLLIElement>(null);
    const refDrawerChild = useRef<HTMLUListElement>(null);

    const drawerDuration = useDrawerStore((state) => state.drawerDuration);
    const drawerState = useDrawerStore((state) => state.drawerState);
    const drawerItemState = useDrawerItemStore(
        (state) => state.drawerItemState,
    );
    const drawerWidthResetOn = useDrawerStore(
        (state) => state.drawerWidthResetOn,
    );
    const drawerItemOpen = useDrawerItemStore((state) => state.drawerItemOpen);
    const drawerItemClose = useDrawerItemStore(
        (state) => state.drawerItemClose,
    );
    const setDrawerChildWidth = useDrawerItemStore(
        (state) => state.setDrawerChildWidth,
    );
    const headerResetOn = useHeaderResetStore((state) => state.headerResetOn);
    const headerResetOff = useHeaderResetStore((state) => state.headerResetOff);

    const drawerChildToggle = () => {
        const el = refDrawerChild.current;
        const width = el!.getBoundingClientRect().width;

        if (!drawerItemState) {
            setDrawerChildOpen((prev) => !prev);
            drawerItemOpen();
            setDrawerChildWidth(width);
        } else if (drawerItemState && !drawerChildOpen) {
            setDrawerChildOpen((prev) => !prev);
        } else {
            setDrawerChildOpen((prev) => !prev);
            drawerItemClose();

            el!.style.transition = `opacity ${drawerDuration}ms step-end, visibility ${drawerDuration}ms step-end`;
            setTimeout(() => {
                el!.style.removeProperty('transition');
            }, drawerDuration);
        }
    };

    const drawerChildClose = () => {
        const el = refDrawerChild.current;

        setDrawerChildOpen((prev) => !prev);
        drawerItemClose();

        el!.style.transition = `opacity ${drawerDuration}ms step-end, visibility ${drawerDuration}ms step-end`;
        setTimeout(() => {
            el!.style.removeProperty('transition');
        }, drawerDuration);
    };

    //他の展開できるDropdownItemをクリックした時の処理
    useEffect(() => {
        const el = refDrawerItem.current;

        if (!el) return;

        const parent = el.parentElement;
        const buttons = parent?.querySelectorAll(':scope > li > button');
        buttons?.forEach(function (button) {
            if (button != el.querySelector(':scope > button')) {
                button.addEventListener('click', () => {
                    setDrawerChildOpen(false);
                });
            }
        });
    }, [refDrawerItem]);

    //ドロワーを閉じた時の処理
    useEffect(() => {
        if (drawerItemState) {
            setTimeout(() => {
                setDrawerChildOpen(false);
                drawerItemClose();
                drawerWidthResetOn();
            }, drawerDuration);
        }
    }, [drawerState]);

    //ウィンドウリサイズの処理
    useEffect(() => {
        window.addEventListener('resize', function () {
            if (window.matchMedia('(min-width:992px)').matches) {
                setDrawerChildOpen(false);
            }
        });
    }, []);

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
                <li className={styles.drawerItem} ref={refDrawerItem}>
                    <button
                        data-modifier={drawerChildOpen ? 'active' : ''}
                        onClick={drawerChildToggle}
                    >
                        {title}
                        <FontAwesomeIcon
                            icon={faAngleRight}
                            className={styles.icon}
                        />
                    </button>
                    <ul
                        className={styles.drawerChild}
                        data-modifier={drawerChildOpen ? 'active' : ''}
                        ref={refDrawerChild}
                    >
                        <li>
                            <button
                                aria-label="子メニューを閉じる"
                                onClick={drawerChildClose}
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
                <li className={styles.drawerItem}>
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
