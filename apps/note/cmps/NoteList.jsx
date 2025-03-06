const { Link, useOutletContext, useParams } = ReactRouterDOM

import { NotePreview } from "./NotePreview.jsx"


export function NoteList() {

    const { notes, onRemove, onEdit, onPinNote, onDuplicate, } = useOutletContext()

    function pinnedNotes(){
        return notes.filter(note => note.isPinned === true).length > 0

    }

    function unpinnedNotes(){
        return notes.filter(note => note.isPinned === false).length > 0

    }

    return <section className="note-list">
                    <section className="pinned-notes" >
                        {pinnedNotes() && <h2>PINNED</h2>}
                        <ul> 
                            {notes.map(note => 
                            <li  key={note.id }   >
                                <div >
                                    {(note.isPinned)&& <NotePreview note={note} onRemove = {onRemove} onEdit={onEdit} onPinNote={onPinNote} onDuplicate={onDuplicate} />}
                                </div>
                            </li>)}
                        </ul>
                    </section>

                    <section className="upinned=notes">
                        {pinnedNotes() && unpinnedNotes() && <h2>OTHERS</h2>}
                        <ul>
                            {notes.map(note => 
                            <li  key={note.id }   >
                                <div className="upinned-notes-list">
                                    {(!note.isPinned)&& <NotePreview note={note} onRemove = {onRemove} onEdit={onEdit} onPinNote={onPinNote} onDuplicate={onDuplicate} />}
                                </div>
                            </li>)}
                        </ul>
                    </section>
    </section>
}


