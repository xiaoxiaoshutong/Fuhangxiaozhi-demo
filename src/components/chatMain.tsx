
import { createSignal, onMount } from 'solid-js'
import roleData from '../assetcs/js/role-data'


export default (Props) => {
  const [roleInfo, setRoleInfo] = createSignal({})
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
    <div>
      {roleInfo().name}
    </div>
  )
}
