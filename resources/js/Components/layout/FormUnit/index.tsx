/*********************************
    インポート
*********************************/

//フック
import { HTMLAttributes } from 'react';
//スタイル
import styles from './index.module.scss';

/*********************************
    コンポーネントデータのエクスポート
*********************************/

export function FormUnit({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    //コンポーネントの出力
    return <div className={styles.form_unit}>{children}</div>;
}

export function FormUnitHeader({
    label,
    required,
}: Readonly<{ label: string; required?: boolean }>) {
    //コンポーネントの出力
    return (
        <div className={styles.form_unit_header}>
            <p className={styles.heading}>{label}</p>
            {required && <p className={styles.required}>必須</p>}
        </div>
    );
}

export function FormUnitBody({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    //コンポーネントの出力
    return <div className={styles.form_unit_body}>{children}</div>;
}

export function FormUnitError({
    message,
}: HTMLAttributes<HTMLParagraphElement> & { message?: string }) {
    return message ? (
        <div className={styles.form_unit_error}>{message}</div>
    ) : null;
}
