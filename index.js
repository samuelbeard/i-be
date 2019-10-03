#! /usr/bin/env node

const cfonts = require('cfonts')
const boxen = require('boxen')
const chalk = require('chalk')

const username = process.argv[2]

let jsonFile;

/**
 * Checks if the profile exists
 */
try {
    jsonFile = require(`./profiles/${username}`)
} catch (e) {
    console.log(`Profile "${username}" doesn't exist!`)
    process.exit(0)
}

console.log(username)

let displayAll = ``

/**
 * Renders an ascii art style name.
 */
const bigName = cfonts.render(jsonFile.name, {
    colors: ['yellow'],
    font: 'simple',
})
displayAll += bigName.string

/**
 * Renders location if it exists.
 */
if (jsonFile.location) {
    displayAll += '\n\n' + chalk`{white Location:}    {cyan ${jsonFile['location']}}`
}

/**
 * Renders website if it exists.
 */
if (jsonFile.website) {
    displayAll += '\n\n' + chalk`{white Website:}     {cyan {underline ${jsonFile['website']}}}`
}

/**
 * Renders links if there are a least one.
 */
if (jsonFile.links) {
    displayAll += '\n\n' + jsonFile.links.map(link => chalk`{grey ${link.label}:} {yellow ${link.url}}`).join('\n')
}

console.log(boxen(displayAll, { padding: 1, margin: 1, borderStyle: 'round' }))
