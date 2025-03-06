export function NoteForm({note, handleChangeInfo, onSave}){

    const isNoteTxt = (note.type === 'NoteTxt')
    const isNoteImg = (note.type === 'NoteImg')
    const isNoteVideo = (note.type === 'NoteVideo')


    return <section className = "note-form">
        <form onSubmit = {onSave}>
           
            <input
                onChange={handleChangeInfo} 
                value={note.info.title}
                id="title" 
                name="title"
                type="text" 
                placeholder="Title"
                 />

           <textarea
                name="txt"
                type="txt" 
                placeholder="Take a note..."
                rows='4'
                value={note.info.txt}
                onChange={handleChangeInfo}
            ></textarea> 

            {isNoteImg && <img width="200" src={note.info.url} alt="" />}
            <div className="video">
                {isNoteVideo && <iframe  width="200"src={note.info.url}></iframe>}
            </div>
            
            

            <button>Close</button>
        </form>    
    </section >

}