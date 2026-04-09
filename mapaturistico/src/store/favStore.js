import { ref } from 'vue'
export const favoritos = ref(JSON.parse(localStorage.getItem('fav')||'[]'))
export const toggleFav = (l)=>{
const i=favoritos.value.findIndex(x=>x.id===l.id)
if(i>=0)favoritos.value.splice(i,1)
else favoritos.value.push(l)
localStorage.setItem('fav',JSON.stringify(favoritos.value))
}
