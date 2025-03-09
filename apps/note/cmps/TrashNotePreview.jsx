import { NoteImg } from "./NoteImg.jsx"
import { NoteTodos } from "./NoteToDos.jsx"
import { NoteTxt } from "./NoteTxt.jsx"
import { NoteVideo } from "./NoteVideo.jsx"

export function TrashNotePreview({note, onRestoreTrash, onPermanentDelete}){
    
    
   
    const {  style } = note
    const { backgroundColor } = style

   
    return  <section className="trash-note-preview">
                
                    <article className="note-preview" style={{backgroundColor: backgroundColor}} >
                        
                        <DynamicCmp note={note} />

                        <div className="trash-preview-buttons">
                            <div onClick={() => onPermanentDelete(note) } className="action-icon trash">
                                <img src="assets\img\trash.svg" alt="" />
                                <span className="action-name">Permanent Delete</span>
                            </div>

                            <div onClick={() => onRestoreTrash(note) } className="action-icon restore">
                                <img height="18" src="assets\img\restore.svg" alt="" />
                                <span className="action-name">Restore to notes</span>
                            </div>
                        </div>
                    </article>
    </section>
}

function DynamicCmp({note}){
    
    switch (note.type) {
        case 'NoteTxt':
            return <NoteTxt note={note} />
        case 'NoteImg':
            return <NoteImg note={note}/>
        case 'NoteVideo':
            return <NoteVideo note = {note} />
        case 'NoteTodo':
                return  <NoteTodos note= {note} /> 
    } 
}

