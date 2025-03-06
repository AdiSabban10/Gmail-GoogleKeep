const { Routes, Route, Navigate } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./views/About.jsx"
import { Home } from "./views/Home.jsx"

import { UserMsg } from "./cmps/UserMsg.jsx"
import { eventBusService } from "./services/event-bus.service.js"

import { MailIndex } from "./apps/mail/views/MailIndex.jsx"
import { MailList } from "./apps/mail/cmps/MailList.jsx"
import { MailDetails } from "./apps/mail/cmps/MailDetails.jsx"

import { NoteIndex } from "./apps/note/views/NoteIndex.jsx"
import { AddNote } from "./apps/note/cmps/AddNote.jsx"
import { NoteEdit2 } from "./apps/note/cmps/NoteEdit2.jsx"
import { TrashNoteIndex } from "./apps/note/cmps/TrashNoteIndex.jsx"
import { UnderConstruction } from "./apps/note/cmps/UnderConstruction.jsx"
import { NoteList } from "./apps/note/cmps/NoteList.jsx"



export function App() {
   
    return (
        <Router>
            <section className="app">
                <AppHeader />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />

                    <Route path="/mail" element={<MailIndex />}>
                        <Route path="" element={<Navigate to="inbox" />} />
                        <Route path=":status" element={<MailList />} />
                        <Route path=":status/:mailId" element={<MailDetails />} />
                    </Route>
                    
                    <Route path="/note" element={<NoteIndex />}>
                        <Route path="/note" element={<NoteList />} > 
                            <Route path="/note/add" element={<AddNote />} />   
                            <Route path="/note/edit/:noteId" element={<NoteEdit2 />} />
                        </Route> 
                        <Route path="/note/soon" element={<UnderConstruction />} />
                        <Route path="/note/trash" element={<TrashNoteIndex />} />
                    </Route>

                </Routes>
                <UserMsg />
            </section>
        </Router>
    )
}
