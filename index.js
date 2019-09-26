#! /usr/bin/env node

const cfonts = require('cfonts')
const boxen = require('boxen')
const chalk = require('chalk')

const username = process.argv[2]

const jsonFile = require(`./profiles/${username}`)

console.log(username)

/**
 * Renders an ascii art style name.
 */
const showName = () => {
    const bigName = cfonts.render(jsonFile.name, {
        colors: ['yellow'],
        font: 'simple',
    })

    return bigName.string
}

const displayAll = () => `
${showName()}
`

console.log(boxen(displayAll(), { padding: 1, margin: 1, borderStyle: 'round' }))
