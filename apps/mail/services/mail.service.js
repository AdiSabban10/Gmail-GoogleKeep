import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    countUnreadInboxMails,
    moveToTrash,
    getFilterFromSearchParams,
    getMailFromSearchParams,
    getNoteFromSearchParams, 
}


function query(filterBy) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.status) {
                if (filterBy.status === 'inbox') {
                    mails = mails.filter(mail => mail.to === loggedinUser.email && !mail.removedAt)
                }
                if (filterBy.status === 'sent') {
                    mails = mails.filter(mail => mail.from === loggedinUser.email && !mail.removedAt)
                }
                if (filterBy.status === 'trash') {
                    mails = mails.filter(mail => mail.removedAt)
                }
                if (filterBy.status === 'starred') {
                    mails = mails.filter(mail => mail.isStarred)
                }
                if (filterBy.status === 'drafts') {
                    mails = []
                }
            }

            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regExp.test(mail.subject) || regExp.test(mail.body))
            }
            if (filterBy.isRead !== undefined && filterBy.isRead !== '') {
                mails = mails.filter(mail => mail.isRead === (filterBy.isRead === 'true'))
            }


            if (filterBy.sortBy === 'title') {
                mails.sort((a, b) => a.subject.localeCompare(b.subject))
            } else if (filterBy.status === 'trash') {
                mails.sort((a, b) => b.removedAt - a.removedAt)
            } else {
                mails.sort((a, b) => b.sentAt - a.sentAt)
            }
            return mails
        })
}

function countUnreadInboxMails() {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            const unreadCount = mails.filter(mail => mail.to === loggedinUser.email && !mail.isRead && !mail.removedAt).length
            return unreadCount
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getEmptyMail() {
    const mail = {
        subject: '',
        body: '',
        isRead: true,
        isStarred: false,
        sentAt: Date.now(),
        removedAt: null,
        from: loggedinUser.email,
        to: '',
    }

    return mail
}

function getFilterFromSearchParams(searchParams) {
    return {
        txt: searchParams.get('txt') || '',
    }
}

function getMailFromSearchParams(searchParams) {
    return {
        compose: 'new',
        subject: searchParams.get('subject') || '',
        body: searchParams.get('body') || '',
    }
}


function getNoteFromSearchParams(searchParams) {
    return {
        title: searchParams.get('title') || '',
        txt: searchParams.get('txt') || '',
    }
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)

    if (!mails || !mails.length) {
        mails = []
        for (let i = 0; i < 20; i++) {
            const mail = {
                id: utilService.makeId(),
                subject: utilService.makeLorem(2),
                body: utilService.makeLorem(20),
                isRead: Math.random() > 0.7,
                isStarred: Math.random() > 0.7,
                sentAt: 1551133930594,
                removedAt: null,
                from: 'momo@momo.com',
                to: loggedinUser.email
            }
            mails.push(mail)
        }
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}

function moveToTrash(mailId) {
    return get(mailId)
        .then(mail => {
            if (!mail.removedAt) {
                mail.removedAt = Date.now()
                return save(mail)
            } else {
                return remove(mailId)
            }
        })
}