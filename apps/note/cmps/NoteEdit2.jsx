const { useState } = React

const { useNavigate } = ReactRouter

import { noteService } from "../services/note.service.js";
import { ActionBtns } from "./ActionBtns.jsx";
import { NoteForm } from "./NoteForm.jsx";
import { NotePin } from "./NotePin.jsx";
import { NoteToDosEdit } from "./NoteToDosEdit.jsx";

export function NoteEdit2({ noteToEdit, onClose, onEdit, onSetColorNote}){

    const navigate = useNavigate()
    const [ note, setNote ] = useState(noteToEdit)



    function onSave(ev) {
        ev.preventDefault()
        if((!note.info.title)&&(!note.info.txt)){ //if note is empty
            console.log('note is empty')
            onClose()
            return 
        }
        
        else{ 
            noteService.save({...note, updatedAt: Date.now(),})
            .then((note) => {
                console.log(note.isPinned)
                onEdit(note)
                onClose()
            }) 
            .catch(() =>  console.log('error'))
            .finally(() => navigate('/note'))
        } 
    }


    function handleTodos(infoObj){
        noteService.save({...note, info: infoObj, updateAt:Date.now() })
            .then((note)=>{
                setNote( note)
                onEdit(note)
                onClose()
            })
       
    }

  
    function setNoteColor(color){
        setNote(prevNote => ({
            ...prevNote,
            style: { ...prevNote.style, backgroundColor: color }
        }))
        onSetColorNote(color) 
    }

    function isNotePinned(noteFromPin){
        setNote(prevNote => ({
            ...prevNote,
            isPinned: noteFromPin.isPinned,
            pinTime: noteFromPin.pinTime
        }))

    }

    function addImgOrVideo(returnedNote){
        console.log(returnedNote)
        setNote(returnedNote)
        onEdit(returnedNote)

    }

    function handleChangeInfo({ target }) {
        const { type, name: prop } = target
        let { value } = target

        switch (type) {
            case 'range':
            case 'number':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break;
        }
        
        if(prop !== 'todos'){
            setNote(prevNote => ({
                ...prevNote,
                info: { ...prevNote.info, [prop]: value }
            }))
        }
        
    
    }

    function getUpdatedDate(){
        if(note.updateAt) return new Date(note.updatedAt).toDateString(3)
        
        else return new Date(note.time).toDateString(3)
         
    }
    

    return (
        <section className="note-edit " >

            <div className="screen"></div>
            <article style={{backgroundColor: note.style.backgroundColor}}>
                <NotePin note={note} onPinNote ={isNotePinned}/>
        
                <DynamicCmp  note={note} handleChangeInfo={handleChangeInfo} onSave={onSave} onHandleTodos={handleTodos}   /> 
                <p>EDITED: {getUpdatedDate()}</p>       
                <ActionBtns note={note} onSetNoteColor={setNoteColor} onLoadImgOrVid={addImgOrVideo}  />

            </article>
            
            
        </section>
    )
    
}



function DynamicCmp(props){
    
    switch (props.note.type) {
        case 'NoteVideo':
        case 'NoteImg':
        case 'NoteTxt':
            return <NoteForm  {...props}/>
        case 'NoteTodo':
            return <NoteToDosEdit {...props}/>
            // return <NoteToDosAdd {...props}/>
             
    }
}



    
