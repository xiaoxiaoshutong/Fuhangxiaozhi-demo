import '../assetcs/css/header.css'
import { Show,onMount } from 'solid-js'
import browser from '../utils/browser'

interface Props {
  title: string
}
export default ({ title }: Props) => {
  onMount(()=>{
    setTimeout(()=>{
      new window.VConsole()
      console.log(browser)
      console.log(window.navigator.userAgent)
      },3000)
  })
  const handleClose = () => {
    window.location.href = '/'
  }
  return (
    <Show when={!browser.versions.weixin}>
          <header>
      <div class={title === '首页' ? 'is-home title' : 'title'}>{title}</div>
    </header>
    </Show>

  )
}
