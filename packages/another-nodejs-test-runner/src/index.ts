#! /usr/bin/env node

import yargs from 'yargs'

function main() {
  const { argv } = yargs(process.argv.slice(2)).options({
    a: { type: 'boolean', default: false },
    b: { type: 'string', demandOption: true },
    c: { type: 'number', alias: 'chill' },
    d: { type: 'array' },
    e: { type: 'count' },
    f: { choices: ['1', '2', '3'] },
  })

  console.log(argv)
}

main()
