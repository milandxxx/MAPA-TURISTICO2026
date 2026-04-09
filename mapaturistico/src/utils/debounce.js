export const debounce=(fn,d=300)=>{let t;return(...a)=>{clearTimeout(t);t=setTimeout(()=>fn(...a),d)}}
