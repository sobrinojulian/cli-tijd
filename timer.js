const Player = require('play-sound')

const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const BEEP = 'beepbeep.mp3'

const playBeep = () => {
  Player().play(BEEP, err => {
    if (err) console.log('Error: Unable to play audio')
  })
}

const getTimeRemaining = end => {
  const now = Date.parse(new Date())
  const left = end - now

  const hours = Math.floor(left / HOUR)
  const minutes = Math.floor((left / MINUTE) % 60)
  const seconds = Math.floor((left / SECOND) % 60)

  return {
    total: left,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  }
}

const printClock = left => {
  const hours = `${left.hours}`.padStart(2, '0')
  const minutes = `${left.minutes}`.padStart(2, '0')
  const seconds = `${left.seconds}`.padStart(2, '0')

  const clock = `${hours}:${minutes}:${seconds}`

  process.stdout.clearLine()
  process.stdout.cursorTo(0)
  process.stdout.write(clock)
}

const beginTimer = delta => {
  const now = Date.parse(new Date())
  const end = new Date(now + delta)

  const updateClock = () => {
    const left = getTimeRemaining(end)

    printClock(left)

    const isEnd = left.total <= 0
    if (isEnd) {
      playBeep()
      clearInterval(timeinterval)
    }
  }
  updateClock()
  const timeinterval = setInterval(updateClock, SECOND)
}

module.exports = beginTimer
