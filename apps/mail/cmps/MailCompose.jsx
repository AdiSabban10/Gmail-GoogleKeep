const { useState, useEffect, useRef } = React
const {  useNavigate,useParams, useSearchParams } = ReactRouterDOM

export function MailCompose({ newMail, onNewMail, onSaveMailCompose, onCloseCompose }){
    const [newMailToEdit, setNewMailToEdit] = useState({...newMail})
    const navigate = useNavigate()

    const [searchParams, setSearchParams] = useSearchParams()
    // const [noteMailContent, setNoteMailContent] = useState({ subject: '', body: '' })
    
    // const params = useParams()
    
    useEffect(() => {
        onNewMail({ ...newMailToEdit })
        console.log('newMailToEdit:', newMailToEdit)
    }, [newMailToEdit])
    
    // useEffect(() => {
    //     const compose = searchParams.get('compose')
    //     const subject = searchParams.get('subject') || ''
    //     const body = searchParams.get('body') || ''
        
    //     if (compose) {
    //         setNewMailToEdit(prevMail => ({ ...prevMail, subject, body }))
    //     }
    // }, [searchParams])
    

    useEffect(() => {
        onNewMail({ ...newMailToEdit })
        if (newMailToEdit.subject || newMailToEdit.body) {
            if (newMailToEdit.subject) searchParams.set('subject', newMailToEdit.subject)
            if (newMailToEdit.body) searchParams.set('body', newMailToEdit.body)
            setSearchParams(searchParams)
        }
    }, [newMailToEdit])
    
    function handleChange({ target }) {
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
        setNewMailToEdit(prevMail => ({ ...prevMail, [prop]: value }))
    }
    

    // if (!searchParams.get('compose')) {
    //     return null
    // }
    // if (!newMailToEdit.compose) {
    //     return null;
    // }

    function sendNote(){
        // const noteContent = {
            //     title: newMailToEdit.subject,
            //     txt: newMailToEdit.body,
            // }
            // console.log('noteContent:', noteContent)
            
            // navigate(`/note/add?title=${newMailToEdit.subject}&body=${newMailToEdit.body}`)
            
            // Link form for sending a note as an email
    
        navigate(`/mail/inbox?compose=new&subject=ADISABBAN&body=SSSSSSSSSSS`)
    
        // navigate(`/mail/inbox?compose=new&subject=${note.info.title}&body=${note.info.txt}`)
        
        
        // setNoteMailContent({subject: '', body: ''})
        // onCloseCompose() 
    }
    

    return (
        <section className="mail-compose">
            <form onSubmit={onSaveMailCompose} className='mail-form'>
                <div className='mail-modal'>
                    <h2>New Message</h2>
                    <button type="button" className='btn-close' onClick={onCloseCompose}>x</button>
                    <div className="mail-input">
                        <label htmlFor="to">To </label>
                        <input onChange={handleChange} value={newMailToEdit.to}
                            id='to' type="text" name='to' />
                    </div>

                    <input className="mail-input" onChange={handleChange} value={newMailToEdit.subject}
                        id='subject' type="text" name='subject' placeholder="Subject"/>

                    <textarea
                            name='body'
                            cols='30'
                            rows='10'
                            value={newMailToEdit.body}
                            onChange={handleChange}
                        ></textarea>
                    <div className="btn-send-compose"> 
                        <button type="submit" className="btn-send">Send</button>
                        {/* <button type="button" className="btn-send" onClick={sendNote}>Send as a note</button> */}
                    </div>
                </div>
            </form>
        </section>
    )
}