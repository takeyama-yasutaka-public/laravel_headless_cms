/*********************************
    インポート
*********************************/

//スタイル
import styles from './index.module.scss';
//フック
import { useHeaderResetStore } from '@/lib/zustand';
//コンポーネント
import { Link } from '@inertiajs/react';
//画像

/*********************************
    コンポーネントデータのエクスポート
*********************************/

export default function Logo() {
    const headerResetOn = useHeaderResetStore((state) => state.headerResetOn);
    const headerResetOff = useHeaderResetStore((state) => state.headerResetOff);

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
            <Link href="/" className={styles.logo} onClick={headerReset}>
                <h1>
                    <img
                        src={`${import.meta.env.VITE_IMAGE_BASE_PATH}brand-logo.png`}
                        alt="BLAND NAME"
                    />
                </h1>
            </Link>
        </>
    );
}
