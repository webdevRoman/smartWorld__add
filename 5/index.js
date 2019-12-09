const app = new Vue({
  el: '#app',
  data: {
    currentTime: new Date(),
    time: '',
    sleepTime: 0,
    programTime: 2,
    incrementTime: 4,
    developTime: 6,
    testTime: 8,
    binary_treeTime: 10,
    codeTime: 12,
    close_sprintTime: 14,
    jsTime: 16,
    hackathonTime: 18,
    roundTime: 20,
    pastTime: 22,
    party: false,
    audio: new Audio('party/Eurythmics - Sweet Dreams.mp3')
  },
  methods: {
    changeParty(event) {
      this.party = !this.party
      if (event.target.innerText == 'Вечеринка!') {
        event.target.innerText = 'Отлично повеселились!'
        this.audio.play()
      } else {
        event.target.innerText = 'Вечеринка!'
        this.audio.pause()
        this.audio.currentTime = 0;
      }
    }
  },
  computed: {
    sleep() {
      let date = this.currentTime
      if (date.getHours() >= this.sleepTime && date.getHours() < Number(this.sleepTime) + 2 && !this.party)
        return true
      return false
    },
    program() {
      let date = this.currentTime
      if (date.getHours() >= this.programTime && date.getHours() < Number(this.programTime) + 2 && !this.party)
        return true
      return false
    },
    increment() {
      let date = this.currentTime
      if (date.getHours() >= this.incrementTime && date.getHours() < Number(this.incrementTime) + 2 && !this.party)
        return true
      return false
    },
    develop() {
      let date = this.currentTime
      if (date.getHours() >= this.developTime && date.getHours() < Number(this.developTime) + 2 && !this.party)
        return true
      return false
    },
    test() {
      let date = this.currentTime
      if (date.getHours() >= this.testTime && date.getHours() < Number(this.testTime) + 2 && !this.party)
        return true
      return false
    },
    binary_tree() {
      let date = this.currentTime
      if (date.getHours() >= this.binary_treeTime && date.getHours() < Number(this.binary_treeTime) + 2 && !this.party)
        return true
      return false
    },
    code() {
      let date = this.currentTime
      if (date.getHours() >= this.codeTime && date.getHours() < Number(this.codeTime) + 2 && !this.party)
        return true
      return false
    },
    close_sprint() {
      let date = this.currentTime
      if (date.getHours() >= this.close_sprintTime && date.getHours() < Number(this.close_sprintTime) + 2 && !this.party)
        return true
      return false
    },
    js() {
      let date = this.currentTime
      if (date.getHours() >= this.jsTime && date.getHours() < Number(this.jsTime) + 2 && !this.party)
        return true
      return false
    },
    hackathon() {
      let date = this.currentTime
      if (date.getHours() >= this.hackathonTime && date.getHours() < Number(this.hackathonTime) + 2 && !this.party)
        return true
      return false
    },
    round() {
      let date = this.currentTime
      if (date.getHours() >= this.roundTime && date.getHours() < Number(this.roundTime) + 2 && !this.party)
        return true
      return false
    },
    past() {
      let date = this.currentTime
      if (date.getHours() >= this.pastTime && date.getHours() < Number(this.pastTime) + 2 && !this.party)
        return true
      return false
    }
  }
})

const timerID = setInterval(updateTime, 1000)
updateTime()

function updateTime() {
  const newTime = new Date()
  app.currentTime = newTime
  app.time = `${newTime.getHours().toString().length > 1 ? newTime.getHours() : '0' + newTime.getHours()}:${newTime.getMinutes().toString().length > 1 ? newTime.getMinutes() : '0' + newTime.getMinutes()}:${newTime.getSeconds().toString().length > 1 ? newTime.getSeconds() : '0' + newTime.getSeconds()}`
}