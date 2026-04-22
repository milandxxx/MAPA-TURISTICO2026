export default {
  get() {
    return JSON.parse(localStorage.getItem('favoritos') || '[]')
  },
  add(id) {
    let f = this.get()
    if (!f.includes(id)) f.push(id)
    localStorage.setItem('favoritos', JSON.stringify(f))
  },
  remove(id) {
    let f = this.get().filter(x => x !== id)
    localStorage.setItem('favoritos', JSON.stringify(f))
  }
}
