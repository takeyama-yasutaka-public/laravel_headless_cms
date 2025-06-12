//クライアントコンポーネントへ変更
'use client';

/*********************************
    インポート
*********************************/

//スタイル
import styles from './index.module.scss';
//フック
//フック
import { bodyScrollStart, bodyScrollStop } from '@/lib/bodyScroll';
import { globalNavi } from '@/lib/constants';
import {
    useDrawerChildItemStore,
    useDrawerItemStore,
    useDrawerStore,
    useHeaderResetStore,
} from '@/lib/zustand';
import { useEffect, useRef } from 'react';
//コンポーネント
import DrawerItem from '@/Components/layout/Header/Drawer/DrawerItem';

/*********************************
    コンポーネントデータのエクスポート
*********************************/

export default function Drawer() {
    const refDrawer = useRef<HTMLUListElement>(null);

    const drawerDuration = useDrawerStore((state) => state.drawerDuration);
    const drawerState = useDrawerStore((state) => state.drawerState);
    const drawerWidthReset = useDrawerStore((state) => state.drawerWidthReset);
    const drawerItemState = useDrawerItemStore(
        (state) => state.drawerItemState,
    );
    const DrawerChildWidth = useDrawerItemStore(
        (state) => state.DrawerChildWidth,
    );
    const drawerChildItemState = useDrawerChildItemStore(
        (state) => state.drawerChildItemState,
    );
    const DrawerGrandchildWidth = useDrawerChildItemStore(
        (state) => state.DrawerGrandchildWidth,
    );
    const drawerClose = useDrawerStore((state) => state.drawerClose);
    const drawerWidthResetOff = useDrawerStore(
        (state) => state.drawerWidthResetOff,
    );
    const headerResetState = useHeaderResetStore(
        (state) => state.headerResetState,
    );

    useEffect(() => {
        const el = refDrawer.current;
        const drawerWidth = el!.getBoundingClientRect().width;

        //ドロワーを開く関数
        function drawerOpen() {
            el!.style.right = drawerWidth - 1 + 'px';
        }

        //ドロワーを閉じる関数
        function drawerClose() {
            el!.style.right = '0';
        }

        if (drawerState) {
            drawerOpen();
            bodyScrollStop();
        } else {
            drawerClose();
            bodyScrollStart();
        }
    }, [drawerState]);

    useEffect(() => {
        const el = refDrawer.current;
        const drawerWidth = el!.getBoundingClientRect().width;

        //子メニューを開く関数
        function childOpen() {
            el!.style.right = drawerWidth + DrawerChildWidth - 2 + 'px';
        }

        //子メニューを閉じる関数
        function childClose() {
            el!.style.right = drawerWidth - 1 + 'px';
        }

        if (drawerItemState) {
            childOpen();
        } else {
            childClose();
        }
    }, [drawerItemState]);

    useEffect(() => {
        const el = refDrawer.current;
        const drawerWidth = el!.getBoundingClientRect().width;

        //孫メニューを開く関数
        function GrandchildOpen() {
            el!.style.right =
                drawerWidth +
                DrawerChildWidth +
                DrawerGrandchildWidth -
                3 +
                'px';
        }

        //孫メニューを閉じる関数
        function GrandchildClose() {
            el!.style.right = drawerWidth + DrawerChildWidth - 2 + 'px';
        }

        if (drawerChildItemState) {
            GrandchildOpen();
        } else {
            GrandchildClose();
        }
    }, [drawerChildItemState]);

    //初期表示の処理
    useEffect(() => {
        const el = refDrawer.current;
        const drawerWidth = el!.getBoundingClientRect().width;

        if (drawerState) {
            el!.style.right = drawerWidth - 1 + 'px';
        } else {
            el!.style.right = '0';
        }
    }, []);

    //子メニューや孫メニューを表示した状態でドロワーを閉じた時の処理
    useEffect(() => {
        const el = refDrawer.current;
        el!.style.right = '0';
        drawerWidthResetOff();
    }, [drawerWidthReset]);

    //ウィンドウリサイズの処理
    useEffect(() => {
        window.addEventListener('resize', function () {
            if (window.matchMedia('(min-width:992px)').matches) {
                drawerClose();
            }
        });
    }, []);

    //リンククリック時に初期化
    useEffect(() => {
        const el = refDrawer.current;

        if (headerResetState) {
            el!.style.transition = 'none';
            el!.style.right = '0';
            drawerClose();
            setTimeout(() => {
                el!.style.removeProperty('transition');
            }, 0);
        }
    }, [headerResetState]);

    //コンポーネントの出力
    return (
        <ul
            className={styles.drawer}
            data-modifier={drawerState ? 'active' : ''}
            style={{ ['--duration' as any]: `${drawerDuration}ms` }}
            ref={refDrawer}
        >
            {globalNavi.items.map((item, index) => {
                return (
                    <>
                        {/* {!item.items ? ( */}
                        <DrawerItem
                            key={item.id}
                            path={item.path}
                            title={item.title}
                            post={item.post}
                        />
                        {/* ) : (
                            <DrawerItem key={item.id} title={item.title}>
                                {item.items!.map((item, index) => {
                                    return (
                                        <>
                                            {!item.items ? (
                                                <DrawerChildItem
                                                    key={item.id}
                                                    path={item.path}
                                                    title={item.title}
                                                />
                                            ) : (
                                                <DrawerChildItem
                                                    key={item.id}
                                                    title={item.title}
                                                >
                                                    {item.items!.map(
                                                        (item, index) => {
                                                            return (
                                                                <DrawerGrandchildItem
                                                                    key={
                                                                        item.id
                                                                    }
                                                                    path={
                                                                        item.path
                                                                    }
                                                                    title={
                                                                        item.title
                                                                    }
                                                                />
                                                            );
                                                        },
                                                    )}
                                                </DrawerChildItem>
                                            )}
                                        </>
                                    );
                                })}
                            </DrawerItem>
                        )} */}
                    </>
                );
            })}
        </ul>
    );
}
