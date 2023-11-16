import '../assetcs/css/header.css'
import { Show } from 'solid-js'
import close from '../assetcs/images/close.png'

interface Props {
  title:string 
}
export default ({title}:Props) => {
  const handleClose=()=>{
    window.location.href = '/'
  }
  return (
    <header>
  <div class={title==='首页'?'is-home title':'title'}>
    {title}
    <Show when={title==="角色对话Chat"}>
      <div class="close" onclick={handleClose}>
        <img src={close} alt="" />
      </div>
    </Show>
  </div>
</header>
  )
}
