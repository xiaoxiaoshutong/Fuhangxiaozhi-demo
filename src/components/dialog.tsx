import { Show } from 'solid-js'
import '../assetcs/css/dialog.css'
import type { Accessor } from 'solid-js'


interface Props {
  show: Accessor<boolean> | boolean
  submit?: () => void
}
export default ({show,submit}:Props) => {
  return (
    <Show when={show}>
      <div class="dialog">111</div>
    </Show>
  )
}
