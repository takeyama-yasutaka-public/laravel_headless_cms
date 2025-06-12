//クライアントコンポーネントへ変更
'use client'

/*********************************
    インポート
*********************************/

//スタイル
import styles from './index.module.scss'
//フック
import { useRef, useEffect } from 'react'
import { useDrawerStore } from '@/lib/zustand'

/*********************************
    コンポーネントデータのエクスポート
*********************************/

export default function Wrapper({children}: Readonly<{children: React.ReactNode;}>) {
  
  const refWrapper = useRef<HTMLDivElement>(null)

  const drawerState = useDrawerStore((state) => state.drawerState)

  useEffect(() => {
    const el = refWrapper.current
    
    if (drawerState) {
      el!.inert = true
    } else {
      el!.inert = false
    }
  }, [drawerState])

  //コンポーネントの出力
  return (
    <div className={styles.wrapper} ref={refWrapper}>
      {children}
    </div>
  )
}
