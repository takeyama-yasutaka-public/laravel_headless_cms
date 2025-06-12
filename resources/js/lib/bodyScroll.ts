/*********************************
    bodyのスクロール制御
*********************************/

let bodyScrollFlag: boolean

function checkiOS(){
  const ua = window.navigator.userAgent.toLowerCase()
  const iOS = ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1 || ua.indexOf('macintosh') > -1 && 'ontouchend' in document
  return iOS
}

function checkScrollBar(){
  const width = window.innerWidth - document.body.clientWidth
  return width > 0
}

//bodyのスクロールを止める関数
export function bodyScrollStop(){
  if (checkiOS()) {
    const windowScroll = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${windowScroll}px`
    document.body.style.width = '100%'
  } else if(checkScrollBar()) {
    const windowScroll = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${windowScroll}px`
    document.body.style.width = '100%'
    document.querySelector('html')!.style.overflowY = 'scroll'
  } else {
    document.body.style.overflow = 'hidden'
  }

  bodyScrollFlag = true
}

//bodyのスクロールを始める関数
export function bodyScrollStart(NavigationEvents?: boolean){
  if (bodyScrollFlag) {
    if (checkiOS()) {
      const bodyTop = document.body.style.top;
      document.body.style.removeProperty('position')
      document.body.style.removeProperty('top')
      document.body.style.removeProperty('width')
      window.scrollTo(0, parseInt(bodyTop) * -1)
    } else if(checkScrollBar()) {
      const bodyTop = document.body.style.top;
      document.body.style.removeProperty('position')
      document.body.style.removeProperty('top')
      document.body.style.removeProperty('width')
      window.scrollTo(0, parseInt(bodyTop) * -1)
      document.querySelector('html')!.style.removeProperty('overflow-y')
    } else {
      document.body.style.removeProperty('overflow')
    }

    if (NavigationEvents) {
      window.scrollTo(0, 0)
    }
  }
  
  bodyScrollFlag = false
}