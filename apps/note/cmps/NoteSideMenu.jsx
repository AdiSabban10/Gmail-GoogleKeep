const { useState, useEffect } = React
const { useNavigate} = ReactRouterDOM


export function NoteSideMenu({mainDisplay}){
    const [ isClosed, setIsClosed ] = useState(false)
    
    const [ isNoteSelected, setIsNoteSelected ] = useState('')
    const [ isRemindersSelected, setIsRemindersSelected ] = useState('')
    const [ isLabelsSelected, setIsLabelsSelected ] = useState('')
    const [ isArchiveSelected, setIsArchiveSelected ] = useState('')
    const [ isTrashSelected, setIsTrashSelected ] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        setIsNoteSelected('selected')
    }, [])

    function toggleSideMenu(){
        setIsClosed(prevIsClosed => !prevIsClosed)
    }

    function resetAll(){
        setIsNoteSelected('')
        setIsRemindersSelected('')
        setIsArchiveSelected('')
        setIsLabelsSelected('')
        setIsTrashSelected('')
    }

  
    return <section className = "side-menu">

                <div onClick={toggleSideMenu} className="hamburger side-btn">
                    <img height="20" src="assets\img\hamburger.svg" alt="" /> 
                </div>

                <div onClick={()=> {resetAll()
                                    setIsNoteSelected('selected')
                                    mainDisplay(true)
                                    navigate('/note')}} 
                                    className={`${isNoteSelected} side-btn`}> 
                    <img src="assets\img\notes.svg" alt="" />
                    {!isClosed && <p>Notes</p>}
                </div>
            
                <div onClick={()=> {resetAll()
                                    setIsRemindersSelected('selected')
                                    mainDisplay(false)
                                    navigate('/note/soon')}}  
                                    className={`${isRemindersSelected} side-btn`}>
                    <img src="assets\img\reminders.svg" alt="" />
                    {!isClosed && <p>Reminders</p>}
                </div>

                <div onClick={()=> {resetAll()
                                    setIsLabelsSelected('selected')
                                    mainDisplay(false)
                                    navigate('/note/soon')}} 
                                    className={`${isLabelsSelected} side-btn`} >
                    <img src="assets\img\edit_labels.svg" alt="" />
                    {!isClosed && <p>Edit labels</p>}
                </div>

                <div onClick={()=> {resetAll()
                                    setIsArchiveSelected('selected')
                                    mainDisplay(false)
                                    navigate('/note/soon')}}  
                                    className={`${isArchiveSelected} side-btn`} >
                    <img src="assets\img\archive.svg" alt="" />
                    {!isClosed && <p>Archive</p>}
                </div>

                <div onClick={()=> {resetAll()
                                    setIsTrashSelected('selected')
                                    mainDisplay(false)
                                    navigate('/note/trash')}}  
                                    className={`${isTrashSelected} side-btn`}>
                    <img src="assets\img\trash.svg" alt="" />
                    {!isClosed && <p>Trash</p>}
                </div>
    </section>
}