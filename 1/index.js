const apiKey = 'Ijj0WXOz2YSQE6h6kI2vCgF3G9lfVaPr'
const logoBtn = document.querySelector('.header-logo')
const search = document.querySelector('.header-search')
const searchInput = document.querySelector('.header-search__input')
const body = document.getElementById('body')
const loadBtn = document.querySelector('.btn-load')

searchInput.addEventListener('focus', () => {
  search.classList.add('header-search_active')
})
searchInput.addEventListener('focusout', () => {
  search.classList.remove('header-search_active')
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

const gifElement = document.createElement('div')
gifElement.classList.add('gif')

function loadTrendyGifs(offset) {
  get(`http://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=12&offset=${offset}`)
  .then((res) => {
    const data = JSON.parse(res)
    for (let i = 0; i < data.data.length; i++) {
      const newGifElement = gifElement.cloneNode()
      newGifElement.innerHTML = `<img src="${data.data[i].images.downsized.url}" alt="Gif">`
      let flag = false
      for (let j = 0; j < body.childNodes.length; j++) {
        if (body.childNodes[j].innerHTML == newGifElement.innerHTML) {
          flag = true
          break
        }
      }
      if (!flag)
        body.appendChild(newGifElement)
      // console.log(data.data[i].images)
    }
  })
  .catch((err) => {
    console.log(err)
  })
}
loadTrendyGifs(0)

function loadSearchGifs(offset, search) {
  if (!searchFlag)
    body.insertAdjacentHTML('beforebegin', `<p class="search-title">Результат поиска по запросу: ${searchRequest}</p>`)
  searchFlag = true
  search = search.toLowerCase().split(' ').join('+')
  get(`http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${search}&limit=12&offset=${offset}`)
  .then((res) => {
    const data = JSON.parse(res)
    for (let i = 0; i < data.data.length; i++) {
      const newGifElement = gifElement.cloneNode()
      newGifElement.innerHTML = `<img src="${data.data[i].images.downsized.url}" alt="Gif">`
      let flag = false
      for (let j = 0; j < body.childNodes.length; j++) {
        if (body.childNodes[j].innerHTML == newGifElement.innerHTML) {
          flag = true
          break
        }
      }
      if (!flag)
        body.appendChild(newGifElement)
    }
  })
  .catch((err) => {
    console.log(err)
  })
}

logoBtn.addEventListener('click', (event) => {
  event.preventDefault()
  const main = document.querySelector('.main')
  if (main.childNodes.length > 2)
    main.removeChild(main.childNodes[0])
  body.innerHTML = ''
  loadTrendyGifs(0)
})

search.addEventListener('submit', (event) => {
  event.preventDefault()
  searchRequest = searchInput.value
  body.innerHTML = ''
  search.reset()
  loadSearchGifs(0, searchRequest)
})


let searchFlag = false
let searchRequest = ''
loadBtn.addEventListener('click', (event) => {
  event.preventDefault()
  if (!searchFlag)
    loadTrendyGifs(body.childNodes.length)
  else
    loadSearchGifs(body.childNodes.length, searchRequest)
})