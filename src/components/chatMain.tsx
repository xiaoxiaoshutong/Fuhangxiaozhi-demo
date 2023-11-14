
import { createSignal, onMount } from 'solid-js'
import roleData from '../assetcs/js/role-data'
import '../assetcs/css/chat.css'
import arrow from '../assetcs/images/arrow.png'
import top from '../assetcs/images/top.png'


export default () => {
  const [roleInfo, setRoleInfo] = createSignal({})
  const [messageList, setMessageList] = createSignal([{role:'user',content:'你能帮我学习加分吗………'}])

  onMount(()=>{
    try{
      const role = sessionStorage.getItem('role')
      const character = sessionStorage.getItem('character')
      setRoleInfo(roleData[role][character])
    }catch(err){
      console.log(err)
    }
  })
  
  return (
    <div class="chat">
      <div class="role-info">
        <div className="left">
          <img src={roleInfo().avatar} alt="" />
          <span class="role-name">{roleInfo().name}</span>
        </div>
        <div className="right">
          <span class="role-name">切换角色</span>
          <img src={arrow} alt="" />
        </div>
      </div>
      <div className="welcome">
        {roleInfo().welcome}
        <img src={top} alt="" />
      </div>
      {
        messageList().map(elem=>{
          if(elem.role==='user'){
            return (
              <div class="user-style">
                <div className="content">
                  {elem.content}
                </div>
                <div className="sanjiao"></div>
              </div>
            )
          }
        })
      }
    </div>
  )
}
