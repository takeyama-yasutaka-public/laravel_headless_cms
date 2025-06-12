/*********************************
    インポート
*********************************/

//スタイル
import styles from './index.module.scss';

/*********************************
    変数定義
*********************************/

type Props = {
    modifier?: string;
};

/*********************************
    コンポーネントデータのエクスポート
*********************************/

export function FormContent({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    //コンポーネントの出力
    return (
        <main className={styles.content}>
            <div className={styles.inner}>{children}</div>
        </main>
    );
}

export function FormContentHeader({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    //コンポーネントの出力
    return <div className={styles.contentHeader}>{children}</div>;
}

export function FormContentBody({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    //コンポーネントの出力
    return <div className={styles.contentBody}>{children}</div>;
}

export function FormContentFooter({
    children,
    modifier,
}: Readonly<{ children: React.ReactNode }> & Props) {
    //コンポーネントの出力
    return (
        <div className={styles.contentFooter} data-modifier={modifier}>
            {children}
        </div>
    );
}
