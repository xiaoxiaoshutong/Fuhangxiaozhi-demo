import '../assetcs/css/header.css'
import { Show,onMount } from 'solid-js'
import browser from '../utils/browser'

interface Props {
  title: string
}
export default ({ title }: Props) => {
  onMount(()=>{
    console.log(browser)
  })
  const handleClose = () => {
    window.location.href = '/'
  }
  return (
    <Show when={!browser.weixin}>
          <header>
      <div class={title === '首页' ? 'is-home title' : 'title'}>{title}</div>
    </header>
    </Show>

  )
}
