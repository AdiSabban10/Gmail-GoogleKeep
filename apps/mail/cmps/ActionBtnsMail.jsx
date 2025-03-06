export function ActionBtnsMail({ mail, removeMail, toggleReadStatus}) {
    
    function handleToggleReadStatus(ev, mailId) {
        ev.stopPropagation()
        toggleReadStatus(mailId)
    }

    function onRemoveMail(ev, mailId) {
        ev.stopPropagation()
        removeMail(mailId)
    }

    return (
        <section className="mail-action-btn">
            <div className="action-icon" onClick={(ev) => onRemoveMail(ev, mail.id)}>
                <img src="assets/img/trash.svg" alt="Trash" />
                <span className="action-name">Delete</span>
            </div>
            <div className="action-icon" onClick={(ev) => handleToggleReadStatus(ev, mail.id)}>
                {mail.isRead ? <img src="assets/img/unread.svg" alt="Unread" /> : <i className="fa-regular fa-envelope-open"></i>}
                <span className="action-name">Mark as {mail.isRead ? 'unread' : 'read'}</span>
            </div>
        </section>
    )
}