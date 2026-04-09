import { ref } from 'vue'
import { lugares as data } from '../data/lugares'

export const useLugares = () => {
const lugares = ref(data)
return { lugares }
}
