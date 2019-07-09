#!/usr/bin/env node

const cli = require('../../lib')

let proc = cli()

proc.command({
    path: 'cp',
    arguments: [
        {
            name: 'src',
            type: 'string',
        },
        {
            name: 'dest',
            type: 'string'
        }
    ],
    options: [
        {
            name: 'recursive',
            shortcut: 'r',
            type: 'boolean',
            default: false
        }
    ]
}, async (conf) => {

})

proc.command({
    path: 'rm',
    arguments: [
        {
            name: 'target',
            type: 'string'
        }
    ],
    options: [
        {
            name: 'recursive',
            shortcut: 'r',
            type: 'boolean'
        }
    ],
    link: remove_file
})
    
proc.run().
catch(e => {
    console.error(e)
})

// private members

async function copy_file(input) {
    console.log(input)
}

function remove_file(input) {

}
