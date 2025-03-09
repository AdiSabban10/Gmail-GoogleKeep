const { useState } = React
const { useNavigate, useParams } = ReactRouterDOM

export function MailSideMenu({ unreadCount, onSetStatus, onShowCompose }){
    const params = useParams()
    const navigate = useNavigate()
    const [selectedFolder, setSelectedFolder] = useState(params.status || 'inbox')
    const [ isClosed, setIsClosed ] = useState(false)
    
    function toggleSideMenu(){
        setIsClosed(prevIsClosed => !prevIsClosed)
    }
   
    function handleFolderClick(folder) {
        setIsClosed(false)
        setSelectedFolder(folder)
        onSetStatus(folder)
        navigate(`/mail/${folder}`)
    }

    function handleComposeClick() {
        setIsClosed(false)
        onShowCompose(true)
        
    }

    

    return (
        <section className="mail-side-menu">

            <button className="hamburger" onClick={toggleSideMenu} >
                <img src="assets\img\hamburger.svg" alt="" />
            </button>
            <button className='mail-compose' onClick={handleComposeClick}>
                <img src="assets\img\edit_labels.svg" alt="" />
                Compose
            </button>
            <ul className = {`menu ${isClosed ? 'show-menu' : 'close-menu'}`}>
            
                <li className={selectedFolder === 'inbox' ? 'selected' : ''} 
                    onClick={() => handleFolderClick('inbox')} >
                            <i className="fa-solid fa-inbox"></i>
                            <span>Inbox</span>
                            <span>{unreadCount}</span>
                </li>
                <li className={selectedFolder === 'sent' ? 'selected' : ''} 
                    onClick={() => handleFolderClick('sent')}>
                            <i className="fa-solid fa-paper-plane"></i>
                            <p>Sent</p>
                </li>
                <li className={selectedFolder === 'trash' ? 'selected' : ''} 
                    onClick={() => handleFolderClick('trash')}>
                            <img src="assets/img/trash.svg" alt="" />
                            <p>Trash</p>
                </li>
                <li className={selectedFolder === 'starred' ? 'selected' : ''} 
                    onClick={() => handleFolderClick('starred')}>
                            <i className="fa-regular fa-star"></i>
                            <p>Starred</p>
                </li>
            </ul> 
        </section>
    )
}