const { Link, useOutletContext, useParams } = ReactRouterDOM

import { MailPreview } from './MailPreview.jsx'
import { ActionBtnsMail } from './ActionBtnsMail.jsx'


// export function MailList({ mails, removeMail, toggleReadStatus, toggleStarredStatus, sortBy }) {
export function MailList() {
    const { status } = useParams()
    const { mails, removeMail, toggleReadStatus, toggleStarredStatus } = useOutletContext()

    if (mails.length === 0) {
        return (
            <div className="no-mails">
                No conversations in {status}.
            </div>
        )
    }

    return (
        <section className="mail-list">
            <ul>
                {mails.map(mail => (
                    <li key={mail.id} className={`${mail.isRead ? '' : 'un-read'}`}> 
                        <Link to={`/mail/${status}/${mail.id}`}>
                            <MailPreview key={mail.id} mail={mail} toggleStarredStatus={toggleStarredStatus}/>
                        </Link>
                        <ActionBtnsMail mail={mail} removeMail={removeMail} toggleReadStatus={toggleReadStatus} toggleStarredStatus={toggleStarredStatus} />
                    </li>))}
            </ul>
        </section>
    )
}
