const { useState, useEffect } = React

export function NoteFilter({ filterBy, onFilter }) {

    

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const { name, type } = target
        let value = (type === 'number') ? +target.value : target.value
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [name]: value }))
        
    }

    const { txt } = filterByToEdit


    return <section className="note-filter">
            <img src="assets\img\magnifying_glass.svg" alt="" />
            <input size="15" onChange={handleChange} value={txt} name="txt" type="text" placeholder="Search..." />
        </section>
}