import { utilService } from '../../../services/util.service.js'

export function MailPreview({ mail, toggleStarredStatus }) {
    

    const sentDate = new Date(mail.sentAt)
    const currentDate = new Date()
    const day = sentDate.getDate()
    const monthName =  utilService.getMonthName(sentDate)

    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true }
    const formattedTime = sentDate.toLocaleTimeString('en-IL', timeOptions).toLocaleUpperCase()
    
    const timeDifference = currentDate - sentDate

    const oneDayInMilliseconds = 24 * 60 * 60 * 1000
    const hasDayPassed = timeDifference >= oneDayInMilliseconds

    const { to, from, subject, body, isStarred } = mail

    function handleToggleStarredStatus(ev, mailId){
        ev.preventDefault()
        ev.stopPropagation()
        toggleStarredStatus(mailId) 
    }
    
    return ( 
        <article className="mail-preview" >
            <div className="action-icon star" onClick={(ev) => handleToggleStarredStatus(ev, mail.id)}>
                {isStarred ? <i className="fa-solid fa-star"></i> : <i className="fa-regular fa-star"></i>}
                <span className="action-name">{isStarred ? '' : 'Not'} Starred</span>
            </div>
            {(to ==='user@appsus.com') && <div className="from">{from}</div>}
            {(from ==='user@appsus.com') && <div className="from">To: {to}</div>}
            <div className="txt">
                <p className="subject">{subject}</p>
                <p className="body">{body}</p>    
            </div>
            <div className="time">
                {hasDayPassed ? `${monthName} ${day}` : formattedTime}
            </div>
        </article>   
    )
}

