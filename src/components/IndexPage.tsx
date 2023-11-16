export default () => {
  const open=()=>{
    window.location.href = '/role'
  }
  return (
    <div class="home">
      <div class="home-top"></div>
      <div class="avatar"></div>
      <div class="info">
        <div class="text1">护航小智</div>
        <div class="text2">用AI技术，帮您护航</div>
      </div>
      <div class="desc">
        护航小智的核心驱动力是一个经过专业微调的
        国产大模型，它在国内安全合规的基础上开发，
        确保了操作的安全性和数据的隐私性。
      </div>
      <div id="home-open-btn" class="button" onclick={open}>
        打开小智
      </div>
    </div>
  )
}
