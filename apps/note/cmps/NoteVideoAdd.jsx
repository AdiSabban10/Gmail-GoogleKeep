import { noteService } from "../services/note.service.js"
import { youtubeService } from "../services/youtube.service.js"
import { VideoList } from "./VideoList.jsx"

const { useState } = React

export function NoteVideoAdd({note: noteToEdit, onChangeVideo, onReturn}){

    const [ note, setNote ] = useState(noteToEdit)
    const [ isReady, setIsReady ] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [finalValue, setFinalValue] = useState('')

    function onSave(ev){
        console.log('second step - submitted')
        ev.preventDefault()
        noteService.save(note)
        .then(onChangeVideo)
    }

    function handleChange({ target }) {
        
        let { value } = target
        setSearchValue(prevSearchValue => prevSearchValue = value)

    }

    function onSearch(ev){
        ev.stopPropagation()
        setFinalValue(searchValue)
        setIsReady(true)  
    }

    function onSelectVideo(videoUrl){
        setNote(prevNote => ({
            ...prevNote,
            info: { ...prevNote.info, url: videoUrl }
        }))
        noteService.save({...note, info: { ...note.info, url: videoUrl } })
            .then(onChangeVideo)
            .finally(setIsReady(false))
        
    }
    
  
    return <section className = "note-video-add">
        {(isReady)&& <VideoList searchValue={finalValue} onSelectVideo={onSelectVideo} />} 
            {/* <form onSubmit = {onSearch}> */}
                <section className="search-video">
                    <input
                    onChange={handleChange} 
                    id="title" 
                    name="title"
                    type="text" 
                    placeholder="Search..."
                    />

                    <button onClick={onSearch}>Search</button>
                    <button type="button" onClick={onReturn}>Return</button>
                </section>
           
       {/* </form>   */}

        

    </section >
    
}
  
