#! /usr/bin/env node

const cfonts = require('cfonts')
const boxen = require('boxen')
const chalk = require('chalk')
let username, jsonFile;


try {
    username = process.argv[2];
    if (!username) {
        console.error('You must specify a github username');
    } else {
        jsonFile = require(`./profiles/${username}`);
        render();
    }
} catch (e) {
    switch (e.code) {
        case 'MODULE_NOT_FOUND':
            console.error('The specified github username was not found');
            break;
        default:
            console.error('An unknown error has occurred');
            break;
    }
}

/**
 * Renders an ascii art style name.
 */
function render() {
    const showName = () => {
        const bigName = cfonts.render(jsonFile.name, {
            colors: ['yellow'],
            font: 'simple',
        });
    
        return bigName.string;
    }
    
    const showLocation = () => chalk`{white Location:}    {cyan ${jsonFile['location']}}`;
    
    const showWebsite = () => chalk`{white Website:}     {cyan {underline ${jsonFile['website']}}}`;
    
    const showLinks = () => jsonFile.links.map(link => chalk`{grey ${link.label}:} {yellow ${link.url}}`).join('\n');
    
    const displayAll = () => `${showName()}\n\n${showLocation()}\n\n${showWebsite()}\n\n${showLinks()}`;
    
    console.log(boxen(displayAll(), { padding: 1, margin: 1, borderStyle: 'round' }));
}
