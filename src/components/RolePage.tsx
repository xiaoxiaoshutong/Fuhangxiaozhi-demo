import { createSignal,onMount,Show } from 'solid-js'
import '../assetcs/css/role.css'
import babygif from '../assetcs/images/baby.gif'
import baby from '../assetcs/images/baby.png'
import sister from '../assetcs/images/sister.png'
import sistergif from '../assetcs/images/sister.gif'
import consultant from '../assetcs/images/consultant.png'
import consultantgif from '../assetcs/images/consultant.gif'
import banner from '../assetcs/images/banner.gif'

export default () => {
  let video: HTMLVideoElement
  // VConsole 默认会挂载到 `window.VConsole` 上
  const [role,setRole]=createSignal(0)
  const [babyCharacter,setBabyCharacter]=createSignal(0)
  const [sisterCharacter,setSisterCharacter]=createSignal(0)
  const [consultantCharacter,setConsultantCharacter]=createSignal(0)
  const characterList = [
    ['古灵精怪','娇小可爱','一本正经','脑洞大开'],
    ['心事姐妹','情感闺蜜','心灵导师','邻里姐姐'],
    ['和谐使者','家庭智囊','家园顾问','别人爸爸']
  ]
  onMount(()=>{
    video.addEventListener("click", playVideo);
    video.muted = true
    document.addEventListener("touchstart", function() {
      video.play();
    });
    playVideo()
  })
  const playVideo=()=>{
    if (video.paused) {
      video.play();
    }
  }
  const [currentCharacterList,setCurrentCharacterList ] = createSignal(characterList[0])
  const roleClick = (value:number)=>{
    // playVideo()
    setRole(value)
    setCurrentCharacterList(characterList[value])
  }
  const characterClick = (value:number)=>{
    const _role=role()
    if(_role===0){
      setBabyCharacter(value)
    }
    if(_role===1){
      setSisterCharacter(value)
    }
    if(_role===2){
      setConsultantCharacter(value)
    }
  }
  const save=()=>{
    window.sessionStorage.setItem('role', role()+'')
    window.sessionStorage.setItem('babyCharacter', babyCharacter()+'')
    window.sessionStorage.setItem('sisterCharacter', sisterCharacter()+'')
    window.sessionStorage.setItem('consultantCharacter', consultantCharacter()+'')
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
      <img src={banner} alt="" />

    </div>
    <div class="role-title">选择助手：</div>
    <div class="role-main" id="role-main">
      <div class="main-item" onclick={()=>{roleClick(0)}} style={role()===0?'border-color:#4E6EF2':''}>
        <div class="avatar">
            <img src={babygif} alt="" class={role()!==0?'display-none':''}/>
            <img src={baby} alt="" class={role()===0?'display-none':''}/>
        </div>
        <div class="role-name">魔法宝贝</div>
        <div class="role-modal" data-role="0"></div>
      </div>
      <div class="main-item" onclick={()=>{roleClick(1)}} style={role()===1?'border-color:#4E6EF2':''} >
        <div class="avatar">
            <img src={sistergif} alt="" class={role()!==1?'display-none':''}/>
            <img src={sister} alt="" class={role()===1?'display-none':''}/>
        </div>
        <div class="role-name">心灵姐姐</div>
        <div class="role-modal" data-role="1"></div>
      </div>
      <div class="main-item" onclick={()=>{roleClick(2)}} style={role()===2?'border-color:#4E6EF2':''}>
        <div class="avatar">
            <img src={consultantgif} alt="" class={role()!==2?'display-none':''}/>
            <img src={consultant} alt="" class={role()===2?'display-none':''}/>
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
            if(role()===0){
              return (
                <li style={babyCharacter()===index?'border-color:#4E6EF2':''} onclick={()=>{characterClick(index)}}>{elem}</li>
              )
            }else if(role()===1){
              return (
                <li style={sisterCharacter()===index?'border-color:#4E6EF2':''} onclick={()=>{characterClick(index)}}>{elem}</li>
              )
            }else{
              return (
                <li style={consultantCharacter()===index?'border-color:#4E6EF2':''} onclick={()=>{characterClick(index)}}>{elem}</li>
              )
            }

          })
        }
      </ul>
    </div>
    <div id="save-btn">
      <div class="button" style="width:5.333rem" onclick={save}>
        保存设置
      </div>
    </div>
  </div>  
  )
}
