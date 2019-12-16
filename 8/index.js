const app = new Vue({
  el: '#app',
  data: {
    currentPlace: ''
  },
  methods: {
    changePlace(place) {
      this.currentPlace = place
    }
  }
})