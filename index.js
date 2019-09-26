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

const showLocation = () => chalk`{white Location:}    {cyan ${jsonFile['location']}}`

const showWebsite = () => chalk`{white Website:}     {cyan {underline ${jsonFile['website']}}}`

const showLinks = () => jsonFile.links.map(link => chalk`{grey ${link.label}:} {yellow ${link.url}}`).join('\n')

const displayAll = () => `
${showName()}

${showLocation()}

${showWebsite()}

${showLinks()}
`

console.log(boxen(displayAll(), { padding: 1, margin: 1, borderStyle: 'round' }))
