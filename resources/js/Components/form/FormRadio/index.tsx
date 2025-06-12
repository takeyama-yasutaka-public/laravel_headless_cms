/*********************************
    インポート
*********************************/

//スタイル
import styles from './index.module.scss'
//フック
import { forwardRef } from 'react'

/*********************************
    変数定義
*********************************/

type Props = {
  name: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

/*********************************
    コンポーネントデータのエクスポート
*********************************/

export const FormRadioGroup = forwardRef(function FormRadioGroup({children}: Readonly<{children: React.ReactNode;}>, ref?: any) {

  //コンポーネントの出力
  return (
    <fieldset className={styles.formRadioGroup} ref={ref}>
      {children}
    </fieldset>
  )
})

export function FormRadio({name, value, onChange}: Props) {
  
  //コンポーネントの出力
  return (
    <label className={styles.formRadio}>
      <input className={styles.input} type="radio" 
        name={name}
        value={value}
        onChange={onChange}
      />
      <span className={styles.icon}></span>
      <span className={styles.text}>{value}</span>
    </label>
  )
}