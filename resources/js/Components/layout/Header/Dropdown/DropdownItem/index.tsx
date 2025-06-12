/*********************************
    インポート
*********************************/

//スタイル
import styles from './index.module.scss';
//フック
import { useHeaderResetStore } from '@/lib/zustand';
import { useEffect, useRef, useState } from 'react';
//コンポーネント
import { Link } from '@inertiajs/react';
//Font Awesome
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
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

export default function DropdownItem({
    children,
    path = '/',
    title,
    post,
}: Readonly<{ children?: React.ReactNode }> & Props) {
    const [dropdownChildOpen, setDropdownChildOpen] = useState(false);

    const refDropdownItem = useRef<HTMLLIElement>(null);
    const refDropdownChild = useRef<HTMLUListElement>(null);

    const headerResetState = useHeaderResetStore(
        (state) => state.headerResetState,
    );

    const dropdownChildToggle = () => {
        setDropdownChildOpen((prev) => !prev);
    };

    useEffect(() => {
        const el = refDropdownItem.current;

        if (!el) return;

        //範囲外をクリックしたときの処理
        const ul = el.querySelector('ul');
        const hundleClickOutside = (e: MouseEvent) => {
            if (!el?.contains(e.target as Node)) {
                setDropdownChildOpen(false);
            } else if (ul?.contains(e.target as Node)) {
                setDropdownChildOpen(true);
            }
        };
        document.addEventListener('click', hundleClickOutside);

        //他の展開できるDropdownItemをホバーした時の処理
        const parent = el.parentElement;
        const buttons = parent?.querySelectorAll(':scope > li > button');
        buttons?.forEach(function (button) {
            if (button != el.querySelector(':scope > button')) {
                button.addEventListener('mouseover', function () {
                    setDropdownChildOpen(false);
                });
            }
        });
        //DropdownItemにフォーカスした時の処理
        const buttonFocuss = parent?.querySelectorAll(
            ':scope > li > button, :scope > li > a',
        );
        buttonFocuss?.forEach(function (buttonFocus) {
            if (
                buttonFocus != el.querySelector(':scope > button, :scope > a')
            ) {
                buttonFocus.addEventListener('focus', function () {
                    setDropdownChildOpen(false);
                });
            }
        });

        return () => {
            document.removeEventListener('click', hundleClickOutside);
        };
    }, [refDropdownItem]);

    //ボタンをホバーした時の処理
    const dropdownChildHover = () => {
        const el = refDropdownItem.current;

        if (!el) return;

        const parent = el.parentElement;
        const buttons = parent?.querySelectorAll(':scope > li > button');
        buttons?.forEach(function (button: any) {
            const opacity = getComputedStyle(button.nextElementSibling).opacity;

            if (opacity === '1') {
                setTimeout(() => {
                    setDropdownChildOpen(true);
                }, 0);
            }
        });
    };

    //ウィンドウリサイズの処理
    useEffect(() => {
        window.addEventListener('resize', function () {
            if (window.matchMedia('(max-width:991.98px)').matches) {
                setDropdownChildOpen(false);
            }
        });
    }, []);

    //リンククリック時に初期化
    useEffect(() => {
        const el = refDropdownChild.current;

        if (!el) return;

        if (headerResetState) {
            el.style.transition = 'none';
            setTimeout(() => {
                setDropdownChildOpen(false);
                setTimeout(() => {
                    el.style.removeProperty('transition');
                }, 100);
            }, 0);
        }
    }, [headerResetState]);

    //コンポーネントの出力
    return (
        <>
            {children ? (
                <li className={styles.dropdownItem} ref={refDropdownItem}>
                    <button
                        onClick={dropdownChildToggle}
                        onMouseEnter={dropdownChildHover}
                    >
                        {title}
                        <FontAwesomeIcon
                            icon={faAngleDown}
                            className={styles.icon}
                        />
                    </button>
                    <ul
                        className={styles.dropdownChild}
                        data-modifier={dropdownChildOpen ? 'active' : ''}
                        ref={refDropdownChild}
                    >
                        {children}
                    </ul>
                </li>
            ) : (
                <li className={styles.dropdownItem}>
                    <Link
                        href={route(path)}
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
