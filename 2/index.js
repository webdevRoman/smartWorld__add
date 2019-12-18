Vue.use(VueMask.VueMaskPlugin)

const app = new Vue({
  el: '#app',
  data: {
    formNumber: '',
    currentNumber: '',
    formHolder: '',
    currentHolder: '',
    formMonth: '',
    formYear: '',
    formCvv: '',
    visa: true,
    mastercard: false,
    mir: false
  },
  methods: {
    cardNumber(inpNumber) {
      let cardNumb = this.currentNumber
      while (cardNumb.length < 16) {
        cardNumb += '#'
      }
      return cardNumb.substr(4 * inpNumber, 4)
    },
    correctMonth(event) {
      let oldVal = Number(event.target.value)
      const cardInput = document.querySelector('.card-month')
      if (event.target.value == '') {
        oldVal = 'MM'
        cardInput.value = oldVal
        return
      }
      if (oldVal > 12)
        oldVal = 12
      else if (oldVal < 1)
        oldVal = '01'
      else if (oldVal < 10)
        oldVal = '0' + oldVal.toString()
      this.formMonth = oldVal
      event.target.value = oldVal
      cardInput.value = oldVal
    },
    correctYear(event) {
      let oldVal = Number(event.target.value)
      const cardInput = document.querySelector('.card-year')
      if (event.target.value == '') {
        oldVal = 'YY'
        cardInput.value = oldVal
        return
      }
      else if (oldVal < 10)
        oldVal = '0' + oldVal.toString()
      event.target.value = oldVal
      this.formYear = oldVal
      cardInput.value = oldVal
    },
    correctCvv(event) {
      let oldVal = Number(event.target.value)
      const cardInput = document.querySelector('.card-cvv__input')
      const card = document.querySelector('.card')
      card.classList.remove('card_rotated')
      if (event.target.value == '') {
        oldVal = 'CVV'
        cardInput.value = oldVal
        return
      }
      else if (oldVal < 10)
        oldVal = '00' + oldVal.toString()
      else if (oldVal < 100)
        oldVal = '0' + oldVal.toString()
      this.formCvv = oldVal
      event.target.value = oldVal
      cardInput.value = oldVal
    },
    rotateCard() {
      const card = document.querySelector('.card')
      card.classList.add('card_rotated')
    },
    checkForm() {
      if (this.formNumber.length < 16 || this.formHolder == '' || this.formMonth == '' || this.formYear == '' || this.formCvv == '')
        alert('Заполнены не все поля формы')
      else
        alert('Форма успешно отправлена')
    }
  },
  watch: {
    formNumber(value) {
      let cardVal = value.split('')
      if (cardVal[0] == 2) {
        this.visa = false
        this.mastercard = false
        this.mir = true
      } else if (cardVal[0] == 5) {
        this.visa = false
        this.mastercard = true
        this.mir = false
      } else {
        this.visa = true
        this.mastercard = false
        this.mir = false
      }
      this.currentNumber = cardVal.filter(symbol => symbol != ' ').join('')
    },
    formHolder(value) {
      this.formHolder = value.toUpperCase()
      const cardInput = document.querySelector('.card-holder')
      cardInput.value = this.formHolder
    },
    formCvv(value) {
      const cardInput = document.querySelector('.card-cvv__input')
      cardInput.value = value
    }
  }
})