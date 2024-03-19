const chalk = require('chalk');
const { log } = require('console');
const fs= require('fs/promises') //filesystem module
const path = require('path')

const notesPath = path.join(__dirname, 'db.json') 

async function addNote(title) {

    const notes = await getNotes();

    const note = {
        title,
        id: Date.now().toString()
    }

    notes.push(note)

    await fs.writeFile(notesPath, JSON.stringify(notes))
    console.log(chalk.bgGreen('Note was added'))
}


async function getNotes(){
    const notes =  await fs.readFile(notesPath, {encoding: 'utf-8'})
    return  Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes(){
    const notes =  await getNotes()
    console.log(chalk.bgGrey('Here is the list of notes:'))
    notes.forEach(element => {
        console.log(chalk.gray(element.id + ' ' + element.title));
    });
}


async function removeId(id){
    const notes =  await getNotes()
    notes.filter((note) => {
        if(note.id !== id){
            notes.pop(note)
        }
    })
    await fs.writeFile(notesPath, JSON.stringify(notes))
}


module.exports = {
    addNote, getNotes, printNotes, removeId
}