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

export default function Hamburger() {

  const refHamburger = useRef<HTMLButtonElement>(null)

  const drawerState = useDrawerStore((state) => state.drawerState)
  const drawerToggle = useDrawerStore((state) => state.drawerToggle)
  const headerResetState = useHeaderResetStore((state) => state.headerResetState)
  
  //リンククリック時に初期化
  useEffect(() => {
    const el = refHamburger.current
    const children = el!.querySelectorAll('span')

    if (headerResetState) {
      children.forEach(function(child) {
        child.style.transition = 'none'
      })
      setTimeout(() => {
        children.forEach(function(child) {
          child.style.removeProperty('transition')
        })
      }, 0)
    }
  }, [headerResetState])

  //コンポーネントの出力
  return (
    <button className={styles.hamburger} data-modifier={drawerState ? "active" : ""} onClick={drawerToggle} ref={refHamburger} aria-label="メニューの開閉">
      <span></span>
      <span></span>
      <span></span>
    </button>
  )
}
