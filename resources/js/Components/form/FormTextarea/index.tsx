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
  rows: number
  placeholder: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

/*********************************
    コンポーネントデータのエクスポート
*********************************/

export const FormTextarea = forwardRef(function FormTextarea({name, rows, placeholder, value, onChange}: Props, ref?: any) {

  //コンポーネントの出力
  return (
    <textarea className={styles.formTextarea}
      name={name}
      rows={rows}
      placeholder={placeholder} 
      value={value} 
      onChange={onChange}
      ref={ref}
    ></textarea>
  )
})