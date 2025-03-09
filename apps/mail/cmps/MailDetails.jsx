const { useOutletContext, useParams, Link } = ReactRouterDOM

import { utilService } from "../../../services/util.service.js"
import { ActionBtnsMail } from "./ActionBtnsMail.jsx"

export function MailDetails() {
    const { mail, removeMail, toggleReadStatus, toggleStarredStatus } = useOutletContext()
    const { status } = useParams()
   
    function getTime(mail) {
        const sentDate = new Date(mail.sentAt)
        const day = sentDate.getDate()
        const monthName =  utilService.getMonthName(sentDate)
        const dayName =  utilService.getDayName(sentDate, 'EN')
    
        const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true }
        const formattedTime = sentDate.toLocaleTimeString('en-IL', timeOptions).toLocaleUpperCase()

        const time = dayName + ', ' + monthName + ' ' + day + ', ' + formattedTime
        return time
    }

    function handleToggleStarredStatus(ev, mailId){
        ev.preventDefault()
        ev.stopPropagation()
        toggleStarredStatus(mailId) 
    }

    if (!mail) return <div>Mail not found...</div>

    return (
        <section className="mail-details">
            <div className="action-btn-details">
                <div className="action-icon back">
                    <Link to={`/mail/${status}`}>
                        <img src="assets/img/back.svg" alt="" />
                        <span className="action-name">Back to {status}</span>
                    </Link>
                </div>
                <div className="action-btn-status">
                    <div className="action-icon star" onClick={(ev) => handleToggleStarredStatus(ev, mail.id)}>
                        {mail.isStarred ? <i className="fa-solid fa-star"></i> : <i className="fa-regular fa-star"></i>}
                        <span className="action-name">{mail.isStarred ? '' : 'Not'} Starred</span>
                    </div>
                    <ActionBtnsMail mail={mail} removeMail={removeMail} toggleReadStatus={toggleReadStatus} toggleStarredStatus={toggleStarredStatus} />
                </div>
            </div>
            <div className="subject">{mail.subject}</div>
            <div className="details">
                <span className="from">{'<'}{mail.from}{'>'}</span>
                <span>{getTime(mail)}</span>
            </div>
            <div className="mail-body">{mail.body}</div>
        </section>
    )
  
}

