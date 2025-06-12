/*********************************
    インポート
*********************************/

//スタイル
import styles from './index.module.scss'
//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

/*********************************
    変数定義
*********************************/

type Props = {
  name: string 
  placeholder: string
  defaultValue: string
  modifier?: string
  ariaLabel: string
}

/*********************************
    コンポーネントデータのエクスポート
*********************************/

export default function SearchBox({name, placeholder, defaultValue, modifier, ariaLabel}: Props) {
  
  //コンポーネントの出力
  return (
    <div className={styles.searchBox} data-modifier={modifier}>
      <input 
        type="search" 
        name={name}
        placeholder={placeholder} 
        defaultValue={defaultValue} 
      />
      <button aria-label={ariaLabel}>
        <FontAwesomeIcon icon={faMagnifyingGlass}/>
      </button>
    </div>
  )
}
