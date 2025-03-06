import { noteService } from "../services/note.service.js"

const { useState } = React

export function NoteImgAdd({note: noteToEdit, onChangeImg, onReturn}){

    const [ note, setNote ] = useState(noteToEdit)

    function onSave(ev){
        console.log('second step - submitted')
        ev.preventDefault()
        noteService.save(note)
        .then(onChangeImg)
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

        
        setNote(prevNote => ({
            ...prevNote,
            updatedAt: Date.now(),
            info: { ...prevNote.info, [prop]: value }
        }))
  
    }
    
  
    return <section className = "note-img-add">
        <form onSubmit = {onSave} >
           
            {/* <label htmlFor="url">Enter an https:// URL:</label> */}
           <input
                onChange={handleChangeInfo} 
                // value={noteToEdit.info.url}
                id="url" 
                name="url"
                type="url" 
                placeholder="https://example.com"
                pattern="https://.*" size="30" 
            /> 
           
            <button>Save</button>
            <button type="button" onClick={onReturn}>Return</button>
            
           
            
            
        </form>    
    </section >
    
}
  
