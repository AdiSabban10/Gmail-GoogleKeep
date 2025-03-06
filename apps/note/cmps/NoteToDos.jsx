const { useState} = React

export function NoteTodos({note}){
    const {info} = note
    const {todos} = info

    
    function isTodoChecked(key){
        return (typeof(todos[key]) === 'number') ? `assets/img/checkbox-checked.svg` : `assets/img/checkbox-unchecked.svg`


    }

    function getDoneAtDate(key){
        if(typeof(todos[key]) === 'number') return new Date(todos[key]).toDateString(7)
        
        else ''
         
    }
    
    
    return <section className="note-todos">
                <h2>{note.info.title}</h2>
                <ul className="to-do-list"> 
                <div className="check-mark">DONE AT:<img height="10" src="assets\img\check-mark.svg" alt="" /></div>
                     
                   {(todos.todo1) && <li>
                                        <span><img height="18" src={isTodoChecked('doneAt1')} alt="" /></span>
                                        {todos.todo1}
                                        <span className="done-at">{getDoneAtDate('doneAt1')}</span>  
                                     </li> } 

                   {(todos.todo2) && <li>
                                        <span><img height="18" src={isTodoChecked('doneAt2')} alt="" /></span> 
                                        {todos.todo2}
                                        <span className="done-at">{getDoneAtDate('doneAt2')}</span>                                    
                                     </li> } 

                   {(todos.todo3) && <li>
                                        <span><img height="18" src={isTodoChecked('doneAt3')} alt="" /></span>  
                                        {todos.todo3}
                                        <span className="done-at">{getDoneAtDate('doneAt3')}</span>  
                                     </li> } 

                   {(todos.todo4) && <li>
                                        <span><img height="18" src={isTodoChecked('doneAt4')} alt="" /></span> 
                                        {todos.todo4}
                                        <span className="done-at">{getDoneAtDate('doneAt4')}</span>  
                                         </li> }

                   {(todos.todo5) && <li>
                                        <span><img height="18" src={isTodoChecked('doneAt5')} alt="" /></span> 
                                        {todos.todo5}
                                        <span className="done-at">{getDoneAtDate('doneAt5')}</span>  
                                         </li> } 
                    
                    </ul>

                    
            </section>
                  
}