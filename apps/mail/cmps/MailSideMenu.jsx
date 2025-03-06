const { useState, useEffect } = React
const { Link, useNavigate, useSearchParams, useParams } = ReactRouterDOM

// export function MailSideMenu({ unreadCount, handleComposeClick , onSetStatus }){
export function MailSideMenu({ unreadCount, onSetStatus, onShowCompose }){
    // const [searchParams, setSearchParams] = useSearchParams()
    const params = useParams()
    const navigate = useNavigate()
    const [selectedFolder, setSelectedFolder] = useState(params.status || 'inbox')
    const [ isClosed, setIsClosed ] = useState(false)
    
    // const [selectedFolder, setSelectedFolder] = useState('inbox')

    function toggleSideMenu(){
        console.log('isClosed:', isClosed)
        setIsClosed(prevIsClosed => !prevIsClosed)
    }
    // useEffect(() => {
    //     // if (params.status) setStatus(params.status)
    //         console.log('params-side-menu:', params)
    // }, [params.status])
    
    function handleFolderClick(folder) {
        setIsClosed(false)
        setSelectedFolder(folder)
        onSetStatus(folder)
        navigate(`/mail/${folder}`)
    }

    function handleComposeClick() {
        setIsClosed(false)
        console.log('isClosed:', isClosed)
        // searchParams.set('compose', 'new')
        // setSearchParams(searchParams)
        onShowCompose(true)
        
    }

    

    return (
        <section className="mail-side-menu">

            {/* <button className='mail-compose' onClick={handleComposeClick}>
                <img src="assets\img\edit_labels.svg" alt="" />
                Compose
            </button> */}
            <button className="hamburger" onClick={toggleSideMenu} >
                <img src="assets\img\hamburger.svg" alt="" />
            </button>
            <button className='mail-compose' onClick={handleComposeClick}>
                <img src="assets\img\edit_labels.svg" alt="" />
                Compose
            </button>
            <ul className = {`menu ${isClosed ? 'show-menu' : 'close-menu'}`}>
                {/* <li className="hamburger" onClick={toggleSideMenu} >
                    <img src="assets\img\hamburger.svg" alt="" />
                </li>
                <li className='mail-compose' onClick={handleComposeClick}>
                    <img src="assets\img\edit_labels.svg" alt="" />
                    Compose
                </li> */}
                <li className={selectedFolder === 'inbox' ? 'selected' : ''} 
                    onClick={() => handleFolderClick('inbox')} >
                        {/* <Link to="/mail/inbox"> */}
                            <i className="fa-solid fa-inbox"></i>
                            <span>Inbox</span>
                            <span>{unreadCount}</span>
                        {/* </Link> */}
                </li>
                <li className={selectedFolder === 'sent' ? 'selected' : ''} 
                    onClick={() => handleFolderClick('sent')}>
                        {/* <Link to="/mail/sent"> */}
                            <i className="fa-solid fa-paper-plane"></i>
                            <p>Sent</p>
                        {/* </Link> */}
                </li>
                <li className={selectedFolder === 'trash' ? 'selected' : ''} 
                    onClick={() => handleFolderClick('trash')}>
                        {/* <Link to="/mail/trash"> */}
                            <img src="assets/img/trash.svg" alt="" />
                            <p>Trash</p>
                        {/* </Link> */}
                </li>
                <li className={selectedFolder === 'starred' ? 'selected' : ''} 
                    onClick={() => handleFolderClick('starred')}>
                        {/* <Link to="/mail/starred"> */}
                            <i className="fa-regular fa-star"></i>
                            <p>Starred</p>
                        {/* </Link> */}
                </li>
                {/* <li className={selectedFolder === 'drafts' ? 'selected' : ''}
                    onClick={() => handleFolderClick('drafts')}>
                        <Link to="/mail/drafts">
                            <i className="fa-regular fa-file"></i>
                            <p>Drafts</p>
                        </Link>
                </li> */}
            </ul> 
        </section>
    )
}