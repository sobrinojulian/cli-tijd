const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60

const convertToMilliseconds = (ss, mm, hh) => {
  let ms = 0
  if (Number.isInteger(ss)) ms += ss * SECOND
  if (Number.isInteger(mm)) ms += mm * MINUTE
  if (Number.isInteger(hh)) ms += hh * HOUR
  return ms
}

const isValidFormat = (str) => {
  const re = /^[0-9]+(?::[0-9]+){0,2}$/
  return re.test(str)
}

const parseValidFormat = (str) => {
  const arrStr = str.split(':').reverse()
  const arrInt = arrStr.map((x) => Number.parseInt(x))
  const [ss, mm, hh] = arrInt
  return convertToMilliseconds(ss, mm, hh)
}

const parseToMilliseconds = (str) => {
  if (!isValidFormat(str)) {
    throw '<timer>: HH:MM:SS or MM:SS or SS'
  }
  return parseValidFormat(str)
}

module.exports = parseToMilliseconds
