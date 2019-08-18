#!/usr/bin/env node

const beginTimer = require('./timer')
const parseToMilliseconds = require('./parser')

const HELP = `
    ⌚️  Command-line timer

    Usage
      $ t <timer>

    Commands
      <timer> FORMAT: HH:MM:SS or MM:SS or SS.
                      HH, MM, SS might be any integer

    Examples
      $ t 22
      00:00:22
      $ t 12:22
      00:12:22
      $ t 1:0:0
      01:00:00
      $ t 00:05:22
      00:05:22
      $ t 22
      00:00:22
`

try {
  const arg = process.argv[2]
  const ms = parseToMilliseconds(arg)
  beginTimer(ms)
} catch (err) {
  console.error(HELP)
}
