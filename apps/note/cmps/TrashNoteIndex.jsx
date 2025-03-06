const { useState, useEffect } = React

import { noteService } from "../services/note.service.js";
import { TrashNoteList } from "./TrashNoteList.jsx";


export function TrashNoteIndex (){
    const [trashNotes, setTrashNotes] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(() => {
        noteService.loadFromTrash()
            .then(trashNotes => setTrashNotes(trashNotes))
    }, [])

    function onPermanentDelete(noteToDelete){
        const noteId = noteToDelete.id
        
        setIsLoading(true)
        
        noteService.removeFromTrash(noteId)
            .then(() => {
                setTrashNotes(prevTrashNotes => prevTrashNotes.filter(note => note.id !== noteId))
            })
            .catch(err => {
                console.log('err:', err)
                
            })
            .finally(() => setIsLoading(false)) 
    }

    function onRestoreTrash(noteToRestore){
        noteService.save({...noteToRestore, id:''})
            .then(onPermanentDelete(noteToRestore))
    }

   
    if (isLoading) return <div className="loader"></div>
    return <section className="note-index trash-note-index full" >

        <TrashNoteList trashNotes={trashNotes} onRestoreTrash={onRestoreTrash} onPermanentDelete={onPermanentDelete} />

    </section>
}
