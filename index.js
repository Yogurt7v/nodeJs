const yargs = require ('yargs')
const pkg  = require('./package.json')
const {addNote, getNotes, printNotes ,removeId, editNote} = require("./notes.controllers")


yargs.command({
    command: "add",
    describe: "add new note to list",
    builder: {
        title:{
            type: "string",
            describe:"note title",
            demandOption: true,
        }
    },
    handler({title}){
    addNote(title)
    },
})


yargs.command(  {
    command: 'list',
    describe: "Print list notes",
    async handler() {
        printNotes()
    }
})


yargs.command({
    command: "remove",
    describe: "Remove note by id",
    builder: {
        id:{
            type: "number",
            describe:"note id",
            demandOption: true,
        }
    },
   async handler({id}){
    removeId(id)
    },

})

yargs.command({
    command: "edit",
    describe: "Edit note by id",
    builder: {
        id:{
            type: "number",
            describe:"note id",
            demandOption: true,
        },
        title: {
            type: "string",
            describe:"note title",
            demandOption: true,
        }
    },
   async handler({id, title}){
        editNote(id, title)
    },

})


yargs.parse()