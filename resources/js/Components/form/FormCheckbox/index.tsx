/*********************************
    インポート
*********************************/

//スタイル
import styles from './index.module.scss';
//フック
import { forwardRef } from 'react';

/*********************************
    変数定義
*********************************/

type Props = {
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    checked?: boolean;
};

/*********************************
    コンポーネントデータのエクスポート
*********************************/

export const FormCheckboxGroup = forwardRef(function FormCheckboxGroup(
    { children }: Readonly<{ children: React.ReactNode }>,
    ref?: any,
) {
    //コンポーネントの出力
    return (
        <fieldset className={styles.formCheckboxGroup} ref={ref}>
            {children}
        </fieldset>
    );
});

export function FormCheckbox({ name, value, onChange, checked }: Props) {
    //コンポーネントの出力
    return (
        <label className={styles.formCheckbox}>
            <input
                className={styles.input}
                type="checkbox"
                name={name}
                value={value}
                onChange={onChange}
                checked={checked}
            />
            <span className={styles.icon}></span>
            <span className={styles.text}>{value}</span>
        </label>
    );
}
