/*********************************
    インポート
*********************************/

//スタイル
import styles from './index.module.scss'

/*********************************
    コンポーネントデータのエクスポート
*********************************/

export function ContentHeader({children}: Readonly<{children: React.ReactNode;}>) {
  
  //コンポーネントの出力
  return (
    <div className={styles.contentHeader}>
      {children}
    </div>
  )
}

export function ContentHeaderBottom({children}: Readonly<{children: React.ReactNode;}>) {
  
  //コンポーネントの出力
  return (
    <div className={styles.contentHeaderBottom}>
      {children}
    </div>
  )
}

export function ContentBody({children}: Readonly<{children: React.ReactNode;}>) {
  
  //コンポーネントの出力
  return (
    <div className={styles.contentBody}>
      {children}
    </div>
  )
}

export function ContentFooter({children}: Readonly<{children: React.ReactNode;}>) {
  
  //コンポーネントの出力
  return (
    <div className={styles.contentFooter}>
      {children}
    </div>
  )
}
