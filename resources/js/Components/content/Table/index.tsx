/*********************************
    インポート
*********************************/

//スタイル
import styles from './index.module.scss'

/*********************************
    変数定義
*********************************/

type Props = {
  modifierDimension: string
  modifierScroll?: string
}

/*********************************
    コンポーネントデータのエクスポート
*********************************/

export default function Table(
  {children, modifierDimension, modifierScroll}: 
  Readonly<{children: React.ReactNode;}>&Props) {
  
  //コンポーネントの出力
  return (
    <div className={styles.table} data-modifierDimension={modifierDimension} data-modifierScroll={modifierScroll}>
      <table className={styles.inner}>
        {children}
      </table>
    </div>
  )
}

