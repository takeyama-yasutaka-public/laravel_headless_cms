/*********************************
    インポート
*********************************/

//スタイル
import styles from './index.module.scss'

/*********************************
    変数定義
*********************************/

type Props = {
  h: string
  modifier: string
}

/*********************************
    コンポーネントデータのエクスポート
*********************************/

export default function Heading(
  {children, h, modifier}: 
  Readonly<{children: React.ReactNode;}>&Props) {
  
  //コンポーネントの出力
  return (
    <>
      {h === 'h1' && (
        <h1 className={styles.heading} data-modifier={modifier}>{children}</h1>
      )}
      {h === 'h2' && (
        <h2 className={styles.heading} data-modifier={modifier}>{children}</h2>
      )}
      {h === 'h3' && (
        <h3 className={styles.heading} data-modifier={modifier}>{children}</h3>
      )}
      {h === 'h4' && (
        <h4 className={styles.heading} data-modifier={modifier}>{children}</h4>
      )}
      {h === 'h5' && (
        <h5 className={styles.heading} data-modifier={modifier}>{children}</h5>
      )}
    </>
  )
}

