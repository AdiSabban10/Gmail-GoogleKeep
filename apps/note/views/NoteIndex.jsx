const { useState, useEffect } = React
const { useSearchParams, Outlet } = ReactRouterDOM

import { AddNote } from "../cmps/AddNote.jsx"
import { NoteFilter } from "../cmps/NoteFilter.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { NoteSideMenu } from "../cmps/NoteSideMenu.jsx"
import { noteService } from "../services/note.service.js"


export function NoteIndex() {

    const [notes, setNotes] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    // const [ filterBy, setFilterBy ] = useState(noteService.getFilterFromSearchParams(searchParams))
    const [ filterBy, setFilterBy ] = useState({})
    const [ showFilterandAdd, setShowFilterAndAdd ] = useState(true) 
    
    
    useEffect(() => {
        noteService.query(filterBy)
            .then(notes => setNotes(notes))
    }, [filterBy])

    function mainDisplay(stat){
        setShowFilterAndAdd(stat)

    }

    function addNewNote(note){//Note already saved to service
        if (!note.isPinned) setNotes([...notes, note])
        else setNotes([note, ...notes])
    }

    function onEdit(noteToEdit){ //Note already saved to service
        placeNote(noteToEdit)
        noteService.save(noteToEdit)
        .then (placeNote)

    }

    function onRemove(ev, noteToTrash){
        ev.stopPropagation()
        const noteId = noteToTrash.id
        console.log('oh yeah!!  triple callback!!')
        setIsLoading(true)
        setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
        
        noteService.saveToTrash(noteToTrash)
        
        noteService.remove(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
            })
            .catch(err => {
                console.log('err:', err)
            })
            .finally(() => setIsLoading(false))
    }

    function onPinNote(noteFromPin){
        noteService.save({...noteFromPin, isPinned: noteFromPin.isPinned, pinTime: (noteFromPin.isPinned) ? Date.now() : ''})
        .then(placeNote)
    }

    function placeNote(noteToPlace){
        console.log('note reached index', noteToPlace.isPinned)
        //Note already saved in the service
        //First take her out and set her again with all the notes
        const restOfNotes = notes.filter(note => note.id !== noteToPlace.id)
        
        const unsortedNotes = [...restOfNotes, noteToPlace]
        
        const sortedNotes = noteService.sortNotes(unsortedNotes)

        setNotes(sortedNotes)
    }

    function onDuplicate(noteToDuplicate){
        const newNote = structuredClone(noteToDuplicate)
        newNote.id = ''
        newNote.time = Date.now()
        newNote.isPinned = false
        newNote.info.title += ' - copy'
        noteService.save(newNote)
            .then((note) => setNotes([...notes, note]))
    }

    function onSetFilterBy(newFilter) {
        
        setFilterBy({ ...newFilter })
    }


    if (isLoading) return <div className="loader"></div>
    return <section className = "note-index not-trash full">

        <header className="note-index-header">

            <img height="50" src="assets\img\keep-icon.png" alt="" />
            <h1>Keep</h1>
            {showFilterandAdd &&  <NoteFilter filterBy={filterBy} onFilter={onSetFilterBy} />}

        </header>

        <main >

            <NoteSideMenu mainDisplay={mainDisplay} />

            {showFilterandAdd && <AddNote notes={notes} onAdd={addNewNote} onPinNote ={placeNote} />} 
                  
            <Outlet context={{
                    notes,
                    onRemove,
                    onEdit,
                    onPinNote,
                    onDuplicate,
                }} />
        </main>
        
    </section>
}

