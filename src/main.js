import './scss/main.scss'
console.log('JS loaded!!!')


const form = document.getElementById('form')
const formParts = form.querySelectorAll('.part')
const stepControl = document.getElementById('step-control')
const stepCircles = stepControl.querySelectorAll('.stepper__panel__step div .stepper__panel__step--circle')
const btnControl = document.getElementById('btn-control')
const nextBtn = btnControl.querySelector('.control__panel--next')
const prevBtn = btnControl.querySelector('.control__panel--back')

let step = 1
btnControl.addEventListener('click', (e) => {
  const targetClassList = e.target.classList;

  // 中間內容修改及上方進度條修改
  if (targetClassList.contains('control__panel--next')) {
    if (step < 3) {
      // 修改當前 step
      step += 1

      // 進度條
      stepCircles[step - 1].classList.add('active')
      stepCircles[step - 2].classList.add('checked')

      // 內容
      formParts.forEach(
        part => part.classList.add('d-none')
      )
      document.getElementById(`step${step}`).classList.remove('d-none')
    }
  } else if (targetClassList.contains('control__panel--back')) {
    if (step > 1) {
      step -= 1
      stepCircles[step].classList.remove('active')
      stepCircles[step - 1].classList.remove('checked')
      formParts.forEach(
        part => part.classList.add('d-none')
      )
      document.getElementById(`step${step}`).classList.remove('d-none')
    }
  }

  // 按鈕修改
  if (step > 1) {
    prevBtn.classList.remove('v-hidden')
  } else {
    prevBtn.classList.add('v-hidden')
  }

  if (step < 3) {
    nextBtn.innerHTML = '下一步 <span class="arrow">→</span>';
  } else if (step === 3) {
    nextBtn.innerHTML = '確認下單';
  }

  console.log('當前step', step)
})



const darkModeToggle = document.getElementById("darkmode__input--toggle--pc");
const darkModeToggleMobile = document.getElementById("nav__darkmode--toggle");
const navLogo = document.querySelector(".navbar__logo")
console.log(navLogo)
const footerLogo = document.querySelector("#footer-logo")
// toggle handler
const darkModeToggleHandler = event => {
  // if (event.target.checked) {
  //   document.querySelector('body').setAttribute("data-theme", "dark");
  //   document.querySelector('footer').setAttribute("data-theme", "dark");
  // } else {
  //   document.querySelector('body').setAttribute("data-theme", "light");
  //   document.querySelector('footer').setAttribute("data-theme", "light");
  // }
  if (event.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    navLogo.setAttribute("src", "images/Logo-dark@2x.png")
    footerLogo.setAttribute("src", "images/Logo-dark@2x.png")
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    navLogo.setAttribute("src", "images/Logo@2x.png")
    footerLogo.setAttribute("src", "images/Logo@2x.png")
  }
};
// bind the event
darkModeToggle.addEventListener("change", darkModeToggleHandler);
darkModeToggleMobile.addEventListener("change", darkModeToggleHandler);

