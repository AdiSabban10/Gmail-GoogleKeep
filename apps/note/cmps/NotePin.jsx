import { noteService } from "../services/note.service.js"

const { useState } = React

export function NotePin({note: noteToPin ,onPinNote}){
        
        const [ note, setNote ] =useState(noteToPin)
        const [noteClass, setNoteClass] = useState(note.isPinned ? 'pinned' : '')
       
                
        function togglePin(ev){
                ev.stopPropagation()
                
                if(noteClass) {
                        setNoteClass('')
                        var stat = false
                }
                else {
                        setNoteClass('pinned')
                        stat = true
                }

                setNote(prevNote =>({...prevNote, isPinned: stat, pinTime: (stat = 'pinned')? Date.now() : ''}) )
                
                if(note.id){
                        noteService.save({...note, isPinned: stat, pinTime: (stat = 'pinned')? Date.now() : ''})
                        .then(onPinNote)
                       
                }
                else onPinNote(stat)        
        }

       

        return <div onClick={togglePin} className={`action-icon note-pin ${noteClass}`}>
                        <img src="assets\img\pin.svg" alt="" />
                        <span className="action-name">Pin Note</span>
                </div>

       
}