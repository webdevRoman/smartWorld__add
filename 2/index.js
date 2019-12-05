const app = new Vue({
  el: '#app',
  data: {
    formNumber: '',
    formHolder: '',
    formMonth: '',
    formYear: '',
    formCvv: '',
    visa: true,
    mastercard: false,
    mir: false
  },
  methods: {
    cardNumber(inpNumber) {
      let cardNumb = this.formNumber
      while (cardNumb.length < 16) {
        cardNumb += '#'
      }
      return cardNumb.substr(4 * inpNumber, 4)
    },
    checkNumber(event) {
      let oldVal = event.target.value
      let newVal = oldVal.split('')
      for (let i = 0; i < newVal.length; i++) {
        if (newVal.length > 0 && newVal[i].match(/\D/))
          newVal[i] = ''
      }
      if (newVal.length > 16)
        newVal.length = 16
      if (newVal[0] == 2) {
        this.visa = false
        this.mastercard = false
        this.mir = true
      } else if (newVal[0] == 5) {
        this.visa = false
        this.mastercard = true
        this.mir = false
      } else {
        this.visa = true
        this.mastercard = false
        this.mir = false
      }
      newVal = newVal.join('')
      this.formNumber = newVal
      event.target.value = newVal
    },
    checkHolder(event) {
      let oldVal = event.target.value
      let newVal = oldVal.split('')
      for (let i = 0; i < newVal.length; i++) {
        if (newVal.length > 0 && newVal[i].match(/[^A-Za-z ]/))
          newVal[i] = ''
      }
      if (newVal.length > 30)
        newVal.length = 30
      newVal = newVal.join('').toUpperCase()
      this.formHolder = newVal
      event.target.value = newVal
      const cardInput = document.querySelector('.card-holder')
      cardInput.value = newVal
    },
    checkMonth(event) {
      let oldVal = event.target.value
      let newVal = oldVal.split('')
      for (let i = 0; i < newVal.length; i++) {
        if (newVal.length > 0 && newVal[i].match(/\D/))
          newVal[i] = ''
      }
      if (newVal.length > 2)
        newVal.length = 2
      newVal = newVal.join('')
      this.formMonth = newVal
      event.target.value = newVal
      const cardInput = document.querySelector('.card-month')
      cardInput.value = newVal
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
    checkYear(event) {
      let oldVal = event.target.value
      let newVal = oldVal.split('')
      for (let i = 0; i < newVal.length; i++) {
        if (newVal.length > 0 && newVal[i].match(/\D/))
          newVal[i] = ''
      }
      if (newVal.length > 2)
        newVal.length = 2
      newVal = newVal.join('')
      this.formYear = newVal
      event.target.value = newVal
      const cardInput = document.querySelector('.card-year')
      cardInput.value = newVal
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
    checkCvv(event) {
      let oldVal = event.target.value
      let newVal = oldVal.split('')
      for (let i = 0; i < newVal.length; i++) {
        if (newVal.length > 0 && newVal[i].match(/\D/))
          newVal[i] = ''
      }
      if (newVal.length > 3)
        newVal.length = 3
      newVal = newVal.join('')
      this.formCvv = newVal
      event.target.value = newVal
      const cardInput = document.querySelector('.card-cvv__input')
      cardInput.value = newVal
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
  }
})