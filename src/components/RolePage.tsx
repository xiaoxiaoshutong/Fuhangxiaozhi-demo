import { createSignal } from 'solid-js'
import '../assetcs/css/role.css'
import baby from '../assetcs/images/baby.png'
import sister from '../assetcs/images/sister.png'
import consultant from '../assetcs/images/consultant.png'
import banner from '../assetcs/images/banner.mp4'

export default () => {
  const [role,setRole]=createSignal(0)
  const [character,setCharacter] = createSignal(0)
  const characterList = [
    ['古灵精怪','娇小可爱','一本正经','脑洞大开'],
    ['心事姐妹','情感闺蜜','心灵导师','邻里姐姐'],
    ['和谐使者','家庭智囊','家园顾问','别人爸爸']
  ]
  const [currentCharacterList,setCurrentCharacterList ] = createSignal(characterList[0])
  const roleClick = (value:number)=>{
    setRole(value)
    setCurrentCharacterList(characterList[value])
  }
  const characterClick = (value:number)=>{
    setCharacter(value)
  }
  const save=()=>{
    window.sessionStorage.setItem('role', role()+'')
    window.sessionStorage.setItem('character', character()+'')
    window.location.href = '/chat'
  }
  return (
    <div class="role">
    <div id="version" class="version">
      <div data-version="1" class="version-item active">
        <div class="version-text1">1.0版</div>
        <div class="version-text2">小智LLM1</div>
      </div>
      <div data-version="2" class="version-item">
        <div class="version-text1">2.0版</div>
        <div class="version-text2">小智LLM2</div>
      </div>
    </div>
    <div class="gif">
      <video src={banner} autoplay loop></video>
    </div>
    <div class="role-title">选择助手：</div>
    <div class="role-main" id="role-main">
      <div class="main-item" onclick={()=>{roleClick(0)}} style={role()===0?'border-color:#4E6EF2':''}>
        <div class="avatar">
          <img src={baby} alt=""/>
        </div>
        <div class="role-name">魔法宝贝</div>
        <div class="role-modal" data-role="0"></div>
      </div>
      <div class="main-item" onclick={()=>{roleClick(1)}} style={role()===1?'border-color:#4E6EF2':''} >
        <div class="avatar">
          <img src={sister} alt=""/>
        </div>
        <div class="role-name">心灵姐姐</div>
        <div class="role-modal" data-role="1"></div>
      </div>
      <div class="main-item" onclick={()=>{roleClick(2)}} style={role()===2?'border-color:#4E6EF2':''}>
        <div class="avatar">
          <img src={consultant} alt=""/>
        </div>
        <div class="role-name">家庭顾问</div>
        <div class="role-modal" data-role="2"></div>
      </div>
    </div>
    <div class="role-title">性格设置：</div>
    <div class="character-opt">
      <ul id="character-ul">
        {
          currentCharacterList().map((elem,index)=>{
            return (
              <li style={character()===index?'border-color:#4E6EF2':''} onclick={()=>{characterClick(index)}}>{elem}</li>
            )
          })
        }
      </ul>
    </div>
    <div id="save-btn" class="button" style="width:5.333rem" onclick={save}>
      保存设置
    </div>
  </div>  
  )
}
