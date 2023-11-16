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
  </div>
</header>
  )
}
