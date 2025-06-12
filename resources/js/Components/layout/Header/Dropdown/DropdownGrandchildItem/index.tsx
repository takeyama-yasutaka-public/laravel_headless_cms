/*********************************
    インポート
*********************************/

//スタイル
import styles from './index.module.scss';
//フック
import { useHeaderResetStore } from '@/lib/zustand';
//コンポーネント
import { Link } from '@inertiajs/react';

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

export default function DropdownGrandchildItem({
    path = '/',
    title,
    post,
}: Props) {
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
        <li className={styles.dropdownGandchildItem}>
            <Link
                href={route(path)}
                onClick={headerReset}
                method={post ? 'post' : 'get'}
                as={post ? 'button' : 'a'}
            >
                {title}
            </Link>
        </li>
    );
}
