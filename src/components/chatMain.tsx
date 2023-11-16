import { createSignal, onMount, Show } from 'solid-js'
import roleData from '../assetcs/js/role-data'
import { generateSignature } from '@/utils/auth'
import '../assetcs/css/chat.css'
import '../assetcs/css/dialog.css'
import arrow from '../assetcs/images/arrow.png'
import top from '../assetcs/images/top.png'
import baby from '../assetcs/images/baby.png'
import sister from '../assetcs/images/sister.png'
import consultant from '../assetcs/images/consultant.png'
import clear from '../assetcs/images/clear.png'
import send from '../assetcs/images/send.png'
import close from '../assetcs/images/close.png'

export default () => {
  let inputRef: HTMLInputElement
  let dialogRef: HTMLDivElement
  const [roleInfo, setRoleInfo] = createSignal({})
  const [controller, setController] = createSignal<AbortController>(null)
  const [loading, setLoading] = createSignal(false)
  const [currentAssistantMessage, setCurrentAssistantMessage] = createSignal('')
  const [showDialog, setShowDialog] = createSignal(false)
  const [showSelectRole, setShowSelectRole] = createSignal(false)
  const [dialogSubTitle, setDialogSubTitle] = createSignal('您要取消这次提问吗?')
  const maxHistoryMessages = parseInt(
    import.meta.env.PUBLIC_MAX_HISTORY_MESSAGES || '9'
  )
  const [messageList, setMessageList] = createSignal([])

  onMount(() => {
    try {
      const role = sessionStorage.getItem('role')
      const character = sessionStorage.getItem('character')
      setRoleInfo(roleData[role][character])
    } catch (err) {
      console.log(err)
    }
  })
  const instantToBottom = () => {
    dialogRef.scrollTo({ top: dialogRef.scrollHeight, behavior: 'instant' })
  }
  const sendMessage = () => {
    const inputValue = inputRef.value
    if (!inputValue) return
    inputRef.value = ''
    setMessageList([...messageList(), { role: 'user', content: inputValue }])
    instantToBottom()
    requestWithLatestMessage()
  }

  const requestWithLatestMessage = async () => {
    setCurrentAssistantMessage('')
    const storagePassword = localStorage.getItem('pass')
    try {
      const controller = new AbortController()
      setController(controller)
      let requestMessageList = messageList().slice(-maxHistoryMessages)
      if (roleInfo().character) {
        requestMessageList.unshift({
          role: 'system',
          content: roleInfo().character,
        })
      }
      requestMessageList = requestMessageList.map((elem) => {
        return { role: elem.role, content: elem.content }
      })
      const timestamp = Date.now()
      setLoading(true)
      const response = await fetch('https://www.alphaedtech.com/api/generate', {
        method: 'POST',
        body: JSON.stringify({
          messages: requestMessageList,
          time: timestamp,
          pass: storagePassword,
          sign: await generateSignature({
            t: timestamp,
            m:
              requestMessageList?.[requestMessageList.length - 1]?.content ||
              '',
          }),
          temperature: 0.6,
        }),
        signal: controller.signal,
      })
      if (!response.ok) {
        const error = await response.json()
        console.error(error.error)
        throw new Error('Request failed')
      }
      const data = response.body
      const reader = data.getReader()
      const decoder = new TextDecoder('utf-8')
      let done = false
      while (!done) {
        const { value, done: readerDone } = await reader.read()
        if (value) {
          const char = decoder.decode(value)
          if (char === '\n' && currentAssistantMessage().endsWith('\n'))
            continue

          if (char) setCurrentAssistantMessage(currentAssistantMessage() + char)
        }
        done = readerDone
      }
      setLoading(false)
      setMessageList([
        ...messageList(),
        {
          role: 'system',
          roleName: roleInfo().roleName,
          content: currentAssistantMessage(),
        },
      ])
      instantToBottom()
    } catch (err) {
      console.log(err)
    }
  }

  let dialogType = ''
  const clearMessage = () => {
    dialogType='clear'
    setDialogSubTitle('您确定要清空当前聊天记录吗?')
    setShowDialog(true)
  }


  const handleClose=()=>{
    dialogType='out'
    setDialogSubTitle('您要取消这次提问吗??')
    setShowDialog(true)
  }

  const handleClear=()=>{
    if(dialogType==='clear'){
      setMessageList([])
    }else{
      window.location.href='/'
    }
    setShowDialog(false)
  }
  const [currentRole,setCurrentRole] = createSignal(0)
  const openSelectRole = ()=>{
    setShowSelectRole(true)
    const role = roleInfo().roleName==='baby'?0:roleInfo().roleName==='sister'?1:2
    setCurrentRole(role)
  }
  const selectRole=(value)=>{
    setCurrentRole(value)
  }
  const handleSelect=()=>{
    setRoleInfo(roleData[currentRole()][0])
    setShowSelectRole(false)
  }
  return (
    <div class="chat-warpper">
      <div class="chat">
        <div class="role-info">
          <div class="left">
            <img src={roleInfo().avatar} alt="" />
            <span class="role-name">{roleInfo().name}</span>
          </div>
          <div class="right" onclick={openSelectRole}>
            <span class="role-name">切换角色</span>
            <img src={arrow} alt="" />
          </div>
        </div>
        <div class="dialog" ref={dialogRef!}>
          <div class="welcome">
            {roleInfo().welcome}
            <img src={top} alt="" />
          </div>
          {messageList().map((elem) => {
            if (elem.role === 'user') {
              return (
                <div class="user-style">
                  <div class="content">{elem.content}</div>
                  <div class="sanjiao"></div>
                </div>
              )
            } else {
              return (
                <div class="system-style">
                  <div class="avatar">
                    <Show when={elem.roleName === 'baby'}>
                      <img src={baby} alt="" />
                    </Show>
                    <Show when={elem.roleName === 'sister'}>
                      <img src={sister} alt="" />
                    </Show>
                    <Show when={elem.roleName === 'consultant'}>
                      <img src={consultant} alt="" />
                    </Show>
                  </div>
                  <div class="sanjiao"></div>
                  <div class="content">{elem.content}</div>
                </div>
              )
            }
          })}
          <Show when={loading()}>
            <div class="loading">{roleInfo().name}正在思考中...</div>
          </Show>
        </div>
        <div class="send-message">
          <div class="clear" onclick={clearMessage}>
            <img src={clear} alt="" />
          </div>
          <div class="input">
            <input
              ref={inputRef!}
              type="text"
              placeholder="你能帮我学习加分吗………"
            />
          </div>
          <div class="send" onclick={sendMessage}>
            <img src={send} alt="" />
          </div>
        </div>
      </div>
      <Show when={showDialog()}>
      <div class="dialog-modal">
        <div class="dialog-main">
          <p class="modal-title">温馨提示</p>
          <p class="sub-title">{dialogSubTitle()}</p>
          <div class="modal-btn">
            <div class="modal-btn-left" onclick={()=>{setShowDialog(false)}}>取消</div>
            <div class="modal-btn-right" onclick={handleClear}>确定</div>
          </div>
        </div>
      </div>
      </Show>
      <Show when={showSelectRole()}>
      <div class="dialog-modal">
        <div class="dialog-main">
          <p class="modal-title">切换角色</p>
          <div class="modal-role">
            <div class="modal-role-item" onclick={()=>{selectRole(0)}} style={currentRole()===0?'border-color:#4E6EF2':''}>
              <img src={baby} alt="" />
              <span>魔法宝贝</span>
            </div>
            <div class="modal-role-item" onclick={()=>{selectRole(1)}} style={currentRole()===1?'border-color:#4E6EF2':''}>
            <img src={sister} alt="" />
              <span>心灵姐姐</span>
            </div>
            <div class="modal-role-item" onclick={()=>{selectRole(2)}} style={currentRole()===2?'border-color:#4E6EF2':''}>
            <img src={consultant} alt="" />
              <span>家庭顾问</span>
            </div>
          </div>
          <div class="modal-btn">
            <div class="modal-btn-left" onclick={()=>{setShowSelectRole(false)}}>取消</div>
            <div class="modal-btn-right" onclick={handleSelect}>确定</div>
          </div>
        </div>
      </div>
      </Show>
      <div class="close" onclick={handleClose}>
        <img src={close} alt="" />
      </div>
    </div>
  )
}
