const fs = require('fs')
const chalk = require('chalk')
const getNotes = () => {
    return 'Your notes ...'
}

const addNote = (title, body) => {
    const notes = loadNotes() 
    //const duplicateNote = notes.filter( (note) => note.title === title)
    const duplicateNote = notes.find( (note) => note.title === title)
    if (!duplicateNote){  //(duplicateNote === undefined)
        notes.push({
            title: title,
            body: body
        })
        console.log(chalk.green.bold('New note added'))
    }else{
        console.log(chalk.red.bold('Title taken!'))
    }

    saveNotes(notes)
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
       }catch(e){
           return []
       }

}

const removeNote = (title) => {
    const notes = loadNotes()
    const notestoKeep = notes.filter( (note) => note.title !== title)

    if(notes.length > notestoKeep.length){
        saveNotes(notestoKeep)
        console.log(chalk.green.bold("Note removed!"))
    
    }    
    else console.log(chalk.red.bold("Note doesn't exist"))
}

const listNotes = () => {
    const notes = loadNotes()
    //notes.filter((note) => { console.log(note.title)} )
    console.log(chalk.green.bold('Your notes:'))
    notes.forEach((note) => {
        console.log(note.title)
    });
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find( (note) => note.title === title )

    if(note){
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    }
    else console.log(chalk.red.bold('Note not found!'))    
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}