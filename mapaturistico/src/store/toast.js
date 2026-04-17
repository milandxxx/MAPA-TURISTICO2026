export const toast = (msg) => {
  const t = document.createElement('div')
  t.innerText = msg
  t.style.position = 'fixed'
  t.style.bottom = '20px'
  t.style.right = '20px'
  t.style.background = 'black'
  t.style.color = 'white'
  t.style.padding = '10px'
  t.style.borderRadius = '8px'

  document.body.appendChild(t)

  setTimeout(() => t.remove(), 2000)
}
