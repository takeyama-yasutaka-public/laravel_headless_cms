/*********************************
    インポート
*********************************/

//スタイル
import styles from './index.module.scss';
//コンポーネント
import Drawer from '@/Components/layout/Header/Drawer';
import DrawerOverlay from '@/Components/layout/Header/DrawerOverlay';
import Dropdown from '@/Components/layout/Header/Dropdown';
import Hamburger from '@/Components/layout/Header/Hamburger';
import Logo from '@/Components/layout/Header/Logo';

/*********************************
    コンポーネントデータのエクスポート
*********************************/

export default function Header() {
    //コンポーネントの出力
    return (
        <>
            <header className={styles.header}>
                <div className={styles.inner}>
                    <Logo />

                    <nav className={styles.navPc}>
                        <Dropdown />
                    </nav>

                    <Hamburger />

                    <nav className={styles.navSP}>
                        <Drawer />
                    </nav>
                </div>
            </header>

            <DrawerOverlay />
        </>
    );
}
