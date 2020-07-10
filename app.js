// const fs = require('fs')
// fs.writeFileSync('notes.txt', 'My name is Sid.')
// fs.appendFileSync('notes.txt', ' I am awesome.')

// const validator = require('validator')
// console.log(validator.isEmail('sidhant@iitk.ac.in'))
// console.log(validator.isURL('https//:fast.ai'))

const notes = require('./notes.js')
const yargs = require('yargs')

// const msg = notes.getNotes()
// console.log(msg)
const chalk = require('chalk')
const { argv } = require('process')                              //revise
//console.log(chalk.green.bold.inverse('Success!'))

//customize yargs version
yargs.version('1.1.0')

//add, remove, list, title

//adding a command
yargs.command({
    command: 'add',
    describe: 'add a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
            },
        body: {
                describe: 'Note body',
                demandOption: true,
                type: 'string'
              }
    },    
    handler(argv){
        notes.addNote(argv.title, argv.body)
    }
})

//removing a command
yargs.command({
    command: 'remove',
    describe: 'remove a note',
    builder: {
        title: {
            describe: 'remove note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title)
    }
})

//listing a command
yargs.command({
    command: 'list',
    describe: 'listing all notes',
    handler(){
        notes.listNotes()
    }
})

//reading a command
yargs.command({
    command: 'read',
    describe: 'reading a note',
    builder: {
        title: {
            describe: 'read out the note',
            demandOption: true,
            type: 'string'           
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})

//console.log(process.argv)
//console.log(yargs.argv)
yargs.parse()