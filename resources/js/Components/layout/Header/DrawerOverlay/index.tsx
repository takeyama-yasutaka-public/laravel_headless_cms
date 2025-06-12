//クライアントコンポーネントへ変更
'use client'

/*********************************
    インポート
*********************************/

//スタイル
import styles from './index.module.scss'
//フック
import { useRef, useEffect } from 'react'
import { useDrawerStore, useHeaderResetStore } from '@/lib/zustand'

/*********************************
    コンポーネントデータのエクスポート
*********************************/

export default function DrawerOverlay() {
  
  const refDrawerOverlay = useRef<HTMLDivElement>(null)

  const drawerState = useDrawerStore((state) => state.drawerState)
  const drawerToggle = useDrawerStore((state) => state.drawerToggle)
  const headerResetState = useHeaderResetStore((state) => state.headerResetState)

  //リンククリック時に初期化
  useEffect(() => {
    const el = refDrawerOverlay.current

    if (headerResetState) {
      el!.style.transition = 'none'
      setTimeout(() => {
        el!.style.removeProperty('transition')
      }, 0)
    }
  }, [headerResetState])

  //コンポーネントの出力
  return (
    <div className={styles.drawerOverlay} data-modifier={drawerState ? "active" : ""} onClick={drawerToggle} ref={refDrawerOverlay}></div>
  )
}
