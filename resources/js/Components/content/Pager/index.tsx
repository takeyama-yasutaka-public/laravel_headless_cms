/*********************************
    インポート
*********************************/

//スタイル
import styles from './index.module.scss';
//コンポーネント
import { Link } from '@inertiajs/react';
//Font Awesome
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/*********************************
    変数定義
*********************************/

type Props = {
    type: string;
    href?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    number?: number;
};

/*********************************
    コンポーネントデータのエクスポート
*********************************/

export function Pager({ children }: Readonly<{ children: React.ReactNode }>) {
    //コンポーネントの出力
    return (
        <nav className={styles.pager}>
            <ul className={styles.inner}>{children}</ul>
        </nav>
    );
}

export function PagerItem({ type, href, onClick, number }: Props) {
    //コンポーネントの出力
    return (
        <>
            {type === 'number' &&
                (href ? (
                    <li className={styles.pagerItem}>
                        <Link href={href!}>{number}</Link>
                    </li>
                ) : (
                    <li className={styles.pagerItem}>
                        <button onClick={onClick}>{number}</button>
                    </li>
                ))}
            {type === 'current' && (
                <li className={styles.pagerItem}>
                    <span data-modifier="active">{number}</span>
                </li>
            )}
            {type === 'dots' && (
                <li className={styles.pagerItem}>
                    <span data-modifier="dots">…</span>
                </li>
            )}
            {type === 'prev' &&
                (href ? (
                    <li className={styles.pagerItem}>
                        <Link href={href!} aria-label="前のページ">
                            <FontAwesomeIcon
                                className={styles.icon}
                                icon={faChevronLeft}
                            />
                        </Link>
                    </li>
                ) : (
                    <li className={styles.pagerItem}>
                        <button onClick={onClick} aria-label="前のページ">
                            <FontAwesomeIcon
                                className={styles.icon}
                                icon={faChevronLeft}
                            />
                        </button>
                    </li>
                ))}
            {type === 'next' &&
                (href ? (
                    <li className={styles.pagerItem}>
                        <Link href={href!} aria-label="次のページ">
                            <FontAwesomeIcon
                                className={styles.icon}
                                icon={faChevronRight}
                            />
                        </Link>
                    </li>
                ) : (
                    <li className={styles.pagerItem}>
                        <button onClick={onClick} aria-label="次のページ">
                            <FontAwesomeIcon
                                className={styles.icon}
                                icon={faChevronRight}
                            />
                        </button>
                    </li>
                ))}
        </>
    );
}
