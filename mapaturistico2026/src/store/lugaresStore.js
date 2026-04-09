import { ref } from 'vue'
import axios from 'axios'
const lugares = ref([])
export function useLugares(){
const cargar = async()=>{
const res = await axios.get('http://127.0.0.1:8000/lugares')
lugares.value = res.data
}
return { lugares, cargar }
}
