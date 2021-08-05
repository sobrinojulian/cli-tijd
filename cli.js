#!/usr/bin/env node

const beginTimer = require('./timer')
const parseToMilliseconds = require('./parser')

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
`

try {
  const arg = process.argv[2]
  const ms = parseToMilliseconds(arg)
  beginTimer(ms)
} catch (err) {
  console.error(HELP)
}
