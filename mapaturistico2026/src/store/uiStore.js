import { ref } from 'vue'
export const loading = ref(false)
export const toasts = ref([])
export const showToast = (msg)=>{
const id=Date.now()
toasts.value.push({id,msg})
setTimeout(()=>toasts.value=toasts.value.filter(t=>t.id!==id),3000)
}
