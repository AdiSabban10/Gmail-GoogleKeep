export function NoteVideo({note}){

   
    return <section className="note-video">
                <h2>{note.info.title}</h2>
                <p>{note.info.txt}</p>
                <iframe  width="240"  src={note.info.url}></iframe>
                
        </section>
                  
                        
}