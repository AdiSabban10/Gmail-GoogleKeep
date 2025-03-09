const { useState, useEffect } = React
const {  useSearchParams } = ReactRouterDOM

export function MailCompose({ newMail, onNewMail, onSaveMailCompose, onCloseCompose }){
    const [newMailToEdit, setNewMailToEdit] = useState({...newMail})
    const [searchParams, setSearchParams] = useSearchParams()
    
    useEffect(() => {
        onNewMail({ ...newMailToEdit })
    }, [newMailToEdit])
    

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
                    </div>
                </div>
            </form>
        </section>
    )
}