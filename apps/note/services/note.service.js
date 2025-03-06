import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"


const NOTE_KEY = 'noteDB'
const TRASH_NOTE_KEY = 'trashNoteDB'
_createNotes()

export const noteService = {
    query,
    sortNotes,
    get,
    remove,
    save,
    createNote,
    saveToTrash,
    loadFromTrash,
    removeFromTrash,
    getFilterFromSearchParams
}

window.ns = noteService

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                
                notes = notes.filter(note => regExp.test(note.info.title ) || regExp.test(note.info.txt))
                
            }

            notes = sortNotes(notes)
            
            return notes
        })
}

function sortNotes(notesArr){
    const pinnedNotes = notesArr.filter(note => note.isPinned === true)
    pinnedNotes.sort((note2, note1) => note1.pinTime - note2.pinTime)
    const unpinnedNotes =notesArr.filter(note => note.isPinned === false)
    unpinnedNotes.sort((note1, note2) => note1.time - note2.time)
    
    return [...pinnedNotes, ...unpinnedNotes]
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length){
        notes = []
        const txt = 'Number 1 rule: when something is working well, do NOT mess it up!!!'
        const noteTxt = createNote('NoteImg', false, {'backgroundColor': '#efeff1'}, {'title': 'Important', 'txt': txt}, Date.now()+1)
        noteTxt.id = utilService.makeId()
        notes.push(noteTxt)

        const url = `assets/img/sweet_noga.png`
        const noteImg = createNote('NoteImg', true, {'backgroundColor': '#aeccdc'}, {'url':url, 'title': 'My Sweet Noga', 'txt': 'Birthday party even on June 7'}, Date.now()+2)
        noteImg.id = utilService.makeId()
        notes.push(noteImg)

        const url2 ='https://i.pinimg.com/originals/12/0b/ce/120bce4262601e926378c1a4d02b47e8.jpg'
        const noteImg2 = createNote('NoteImg', false, {'backgroundColor': ' #b4ddd3'}, {'url':url2, 'title': 'Scorpion Handstand'}, Date.now()+2)
        noteImg2.id = utilService.makeId()
        notes.push(noteImg2)

        const videoUrl = `https://www.youtube.com/embed/aUgtMaAZzW0?`
        const noteVideo =  createNote('NoteVideo', false, {'backgroundColor': '#e9e3d4'}, {'url':videoUrl, 'title': 'Ashtanga Primary Series'}, Date.now()+3)
        noteVideo.id = utilService.makeId()
        notes.push(noteVideo)

        const videoUrl2 = 'https://www.youtube.com/embed/8gECJx6YWCI' 
        const noteVideo2 =  createNote('NoteVideo', true, {'backgroundColor': '#d3bfdb'}, {'url':videoUrl2, 'title': 'Ashtanga Intermediate Series'}, Date.now()+4)
        noteVideo2.id = utilService.makeId()
        notes.push(noteVideo2)

        const noteTodo = createNote('NoteTodo', true, {'backgroundColor': '#fff8b8'}, {'title':'Things to do', 'todos':{'todo1':'Make this work', 'todo2':'eat', 'todo3':'sleep', 'todo4':'Workout💪🏽', 'doneAt4': Date.now()}}, Date.now()+5 )
        notes.push(noteTodo)
        utilService.saveToStorage(NOTE_KEY, notes)

    }
}


function createNote(type, isPinned, style, info, time = Date.now()){
    const note = {
                    // id:  utilService.makeId(),        
                    type, 
                    isPinned, 
                    pinTime: (isPinned)? Date.now() : '',
                    style, 
                    info,
                    time,
                    updatedAt: time
                }
   return note
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
    .then(note => {
        // note = _setNextPrevCarId(note)
        return note
    })
   
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        
        return storageService.post(NOTE_KEY, note)
    }
}

function saveToTrash(note){
    let notes = utilService.loadFromStorage(TRASH_NOTE_KEY)
    if(!notes) notes = []
    notes.unshift(note)
    utilService.saveToStorage(TRASH_NOTE_KEY, notes)
}

function loadFromTrash(){
    return storageService.query(TRASH_NOTE_KEY)
}

function removeFromTrash(noteId) {
    return storageService.remove(TRASH_NOTE_KEY, noteId)
}

function getFilterFromSearchParams(searchParams) {
    return {
        // title: searchParams.get('title') || '',
        txt: searchParams.get('txt') || '',
    }
}


