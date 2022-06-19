import './scss/main.scss'
console.log('JS loaded!!!')
const btnControl = document.querySelector("#btn-control")
console.log(btnControl)
btnControl.addEventListener('click', (e) => {
console.log(e.target);
  if (e.target.classList.contains('control__panel--next')){
    console.log('下一步')
  }
})