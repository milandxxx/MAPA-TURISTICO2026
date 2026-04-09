import axios from 'axios'
export function useFav(){
const toggleFav = async(id)=>{
await axios.put(http://127.0.0.1:8000/lugares//fav)
}
return { toggleFav }
}
