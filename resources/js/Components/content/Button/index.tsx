/*********************************
    インポート
*********************************/

//スタイル
import styles from './index.module.scss';
//コンポーネント
import { Link } from '@inertiajs/react';
//Font Awesome
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/*********************************
    変数定義
*********************************/

type Props = {
    href?: string;
    type?: 'submit' | 'reset' | 'button' | undefined;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    modifierColor?: string;
    modifierSize?: string;
    modifierIcon?: string;
    icon?: string;
};

/*********************************
    コンポーネントデータのエクスポート
*********************************/

export function Button({
    children,
    href,
    type,
    onClick,
    modifierColor,
    modifierSize,
    modifierIcon,
    icon,
}: Readonly<{ children: React.ReactNode }> & Props) {
    //コンポーネントの出力
    return (
        <>
            {href ? (
                <Link
                    href={route(href)}
                    className={styles.button}
                    data-modifierColor={modifierColor}
                    data-modifierSize={modifierSize}
                    data-modifierIcon={modifierIcon}
                >
                    {children}
                    {icon === 'faAngleRight' ? (
                        <FontAwesomeIcon
                            icon={faAngleRight}
                            className={styles.icon}
                        />
                    ) : (
                        ''
                    )}
                </Link>
            ) : (
                <button
                    type={type}
                    onClick={onClick}
                    className={styles.button}
                    data-modifierColor={modifierColor}
                    data-modifierSize={modifierSize}
                    data-modifierIcon={modifierIcon}
                >
                    {children}
                    {icon === 'faAngleRight' ? (
                        <FontAwesomeIcon
                            icon={faAngleRight}
                            className={styles.icon}
                        />
                    ) : (
                        ''
                    )}
                </button>
            )}
        </>
    );
}

export function ButtonGroup({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    //コンポーネントの出力
    return <div className={styles.buttonGroup}>{children}</div>;
}
