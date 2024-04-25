#!/usr/bin/env node

const { exec } = require('child_process');

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const BEEP = 'beepbeep.mp3';

const convertToMilliseconds = (ss, mm, hh) => {
  let ms = 0;
  if (Number.isInteger(ss)) ms += ss * SECOND;
  if (Number.isInteger(mm)) ms += mm * MINUTE;
  if (Number.isInteger(hh)) ms += hh * HOUR;
  return ms;
};

const isValidFormat = (str) => {
  const re = /^[0-9]+(?::[0-9]+){0,2}$/;
  return re.test(str);
};

const parseValidFormat = (str) => {
  const arrStr = str.split(':').reverse();
  const arrInt = arrStr.map((x) => Number.parseInt(x));
  const [ss, mm, hh] = arrInt;
  return convertToMilliseconds(ss, mm, hh);
};

const parseToMilliseconds = (str) => {
  if (!isValidFormat(str)) {
    throw '<timer>: HH:MM:SS or MM:SS or SS';
  }
  return parseValidFormat(str);
};

const playBeep = () => {
  const player = 'mpg123';
  const flags = '-q';
  const path = `${__dirname}/${BEEP}`;
  const cmd = `${player} ${flags} ${path}`;
  exec(cmd);
};

const getTimeRemaining = (end) => {
  const now = Date.parse(new Date());
  const left = end - now;

  const hours = Math.floor(left / HOUR);
  const minutes = Math.floor((left / MINUTE) % 60);
  const seconds = Math.floor((left / SECOND) % 60);

  return {
    total: left,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
};

const printClock = (left) => {
  const hours = `${left.hours}`.padStart(2, '0');
  const minutes = `${left.minutes}`.padStart(2, '0');
  const seconds = `${left.seconds}`.padStart(2, '0');

  const clock = `${hours}:${minutes}:${seconds}`;

  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(clock);
};

const beginTimer = (delta) => {
  const now = Date.parse(new Date());
  const end = new Date(now + delta);

  const updateClock = () => {
    const left = getTimeRemaining(end);

    printClock(left);

    const isEnd = left.total <= 0;
    if (isEnd) {
      playBeep();
      clearInterval(timeinterval);
    }
  };
  updateClock();
  const timeinterval = setInterval(updateClock, SECOND);
};

const HELP = `
⌚️  Command-line timer

Usage
  $ timer <timer>

Commands
  <timer> FORMAT: HH:MM:SS or MM:SS or SS.
                  HH, MM, SS might be any integer

Examples
  $ timer 22
  00:00:22
  $ timer 12:22
  00:12:22
  $ timer 1:0:0
  01:00:00
  $ timer 00:05:22
  00:05:22
  $ timer 22
  00:00:22
`;

try {
  const arg = process.argv[2];
  const ms = parseToMilliseconds(arg);
  beginTimer(ms);
} catch (err) {
  console.error(HELP);
}
