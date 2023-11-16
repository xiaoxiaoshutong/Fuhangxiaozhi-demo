import { Show } from 'solid-js'
import '../assetcs/css/dialog.css'
import type { Accessor } from 'solid-js'


interface Props {
  show: boolean
  subTitle:string
  submit?: () => void
  cancel?: () => void
}
export default ({show,submit,subTitle,cancel}:Props) => {
  return (
    <Show when={show}>
      <div class="dialog-modal">
        <div class="dialog-main">
          <p class="modal-title">温馨提示</p>
          <p class="sub-title">{subTitle}</p>
          <div class="modal-btn">
            <div class="modal-btn-left" onclick={cancel}>取消</div>
            <div class="modal-btn-right" onclick={submit}>确定</div>
          </div>
        </div>
      </div>
    </Show>
  )
}
