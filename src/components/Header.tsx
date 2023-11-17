import '../assetcs/css/header.css'
import { Show } from 'solid-js'
import browser from '../utils/browser'

interface Props {
  title: string
}
export default ({ title }: Props) => {
  return (
    <Show when={!browser.versions.weixin}>
          <header>
      <div class={title === '首页' ? 'is-home title' : 'title'}>{title}</div>
    </header>
    </Show>

  )
}
