import './scss/main.scss'

const form = document.getElementById('form')
const formParts = form.querySelectorAll('.part')
const stepControl = document.getElementById('step-control')
const stepCircles = stepControl.querySelectorAll('.stepper__panel__step div .stepper__panel__step--circle')
const btnControl = document.getElementById('btn-control')
const nextBtn = btnControl.querySelector('.control__panel--next')
const prevBtn = btnControl.querySelector('.control__panel--back')
const darkModeToggle = document.getElementById("darkmode__input--toggle--pc");
const darkModeToggleMobile = document.getElementById("nav__darkmode--toggle");
const navLogo = document.querySelector(".navbar__logo")
const footerLogo = document.querySelector("#footer-logo")

// 位於哪個階段
let step = 1

const showStepContent = () => {
  formParts.forEach(
    part => part.classList.add('d-none')
  )
  document.getElementById(`step${step}`).classList.remove('d-none')
}

const showButton = () => {
  if (step > 1) {
    prevBtn.classList.remove('v-hidden')
  } else {
    prevBtn.classList.add('v-hidden')
  }

  if (step < 3) {
    nextBtn.innerHTML = '下一步 <span class="arrow next-arrow">→</span>';
  } else if (step === 3) {
    nextBtn.innerHTML = '確認下單';
  }
}

btnControl.addEventListener('click', (e) => {
  const targetClassList = e.target.classList;

  // 修改步驟發生的事情，進度條修改
  if (targetClassList.contains('control__panel--next') || targetClassList.contains('next-arrow')) {
    if (step < 3) {
      // 修改當前 step
      step += 1

      // 進度條
      stepCircles[step - 1].classList.add('active')
      stepCircles[step - 2].classList.add('checked')
    }
  } else if (targetClassList.contains('control__panel--back') || targetClassList.contains('back-arrow')) {
    if (step > 1) {
      step -= 1
      stepCircles[step].classList.remove('active')
      stepCircles[step - 1].classList.remove('checked')
    }
  } else return true

  // 中間內容修改
  showStepContent()

  // 按鈕修改
  showButton()
})

/* 夜間模式 Start */
// toggle handler
const darkModeToggleHandler = event => {
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

/* 夜間模式 End */

/* 購物籃 Start */

// 假設從API出來產品列表
const products = [
  {
    name: "product1",
    price: 3999
  },
  {
    name: "product2",
    price: 1299
  }
]

const totalEle = document.querySelector(".total-fee-amount")

const cartBtnControl = e => {
  const cartNumberTag = e.target.parentElement.children[1]
  const cartPriceTag = e.target.parentElement.parentElement.children[2]

  // 產品價格
  const { price: cartPrice } = products.find(({ name }) => name === e.target.parentElement.id)

  let cartNumber = Number(cartNumberTag.innerText)
  let cartItemAmount = 0
  let totalAmount = Number(totalEle.innerText.substr(1).replace(/,/, ""))

  if (e.target.classList.contains("cart-item-button1")) {
    cartNumber += 1
    cartNumberTag.innerText = cartNumber
    totalAmount += cartPrice
  } else if (e.target.classList.contains("cart-item-button2")) {
    cartNumber -= 1
    if (cartNumber < 0) {
      cartNumber = 0
    }
    cartNumberTag.innerText = cartNumber
    totalAmount -= cartPrice
  }

  cartItemAmount = cartNumber * cartPrice
  cartItemAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(cartItemAmount)
  cartPriceTag.innerText = cartItemAmount
  totalEle.innerText = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(totalAmount)
}

document.querySelector(".shopping-cart__panel").addEventListener("click", cartBtnControl)
/* 購物籃 End */