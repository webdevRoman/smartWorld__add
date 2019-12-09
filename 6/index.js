const app = new Vue({
  el: '#app',
  data: {
    user: '',
    repository: '',
    language: 'Any language',
    results: null
  },
  methods: {
    doSearch() {
      get(`https://api.github.com/users/${this.user.toLowerCase()}/repos`)
      .then((res) => {
        this.results = JSON.parse(res)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    resetForm() {
      const form = document.querySelector('.search')
      this.user = ''
      this.repository = ''
      this.language = 'Any language'
      this.results = null
      form.reset()
    }
  },
  computed: {
    filteredResults() {
      let filtRes = []
      for (let i = 0; i < this.results.length; i++) {
        if ((this.repository != '' && this.results[i].name.toLowerCase().match(new RegExp(this.repository.toLowerCase())) && this.language != 'Any language' && this.results[i].language != null && this.language.toLowerCase() == this.results[i].language.toLowerCase())
        || (this.repository != '' && this.results[i].name.toLowerCase().match(new RegExp(this.repository.toLowerCase())) && this.language == 'Any language')
        || (this.repository == '' && this.language != 'Any language' && this.results[i].language != null && this.language.toLowerCase() == this.results[i].language.toLowerCase())
        || (this.repository == '' && this.language == 'Any language')) {
          filtRes.push(this.results[i])
        }
      }
      return filtRes
    }
  }
})

function get(url) {
  return new Promise(function(succeed, fail) {
    const request = new XMLHttpRequest()
    request.open("GET", url, true)
    request.addEventListener("load", function() {
      if (request.status < 400)
        succeed(request.response)
      else
        fail(new Error("Request failed: " + request.statusText))
    })
    request.addEventListener("error", function() {
      fail(new Error("Network error"))
    })
    request.send()
  })
}