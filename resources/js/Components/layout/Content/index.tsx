/*********************************
    インポート
*********************************/

//スタイル
import styles from './index.module.scss'

/*********************************
    コンポーネントデータのエクスポート
*********************************/

export function Content({children}: Readonly<{children: React.ReactNode;}>) {
  
  //コンポーネントの出力
  return (
    <main className={styles.content}>
      {children}
    </main>
  )
}

export function ContentBox({children}: Readonly<{children: React.ReactNode;}>) {
  
  //コンポーネントの出力
  return (
    <div className={styles.contentBox}>
      <div className={styles.inner}>
        {children}
      </div>
    </div>
  )
}
