const { useState, useEffect } = React

export function MailFilter({ filterBy, onFilter, onSort }) {
    const [ filterByToEdit, setFilterByToEdit ] = useState({ ...filterBy })
    const [sortBy, setSortBy] = useState('date')
    const [showSearchOptions, setShowSearchOptions] = useState(false)

    useEffect(() => {
        onFilter({ ...filterByToEdit })
    }, [filterByToEdit])

    useEffect(() => {
        onSort(sortBy)
    }, [sortBy])

    function handleChange({ target }) {
        const { name, type } = target
        const value = (type === 'number') ? +target.value : target.value
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [name]: value }))
    }

    function handleSortChange({ target }) {
        const { value } = target
        setSortBy(value)
    }

    function toggleSearchOptions() {
        setShowSearchOptions(prevShow => !prevShow)
    }


    return (
        <section className="mail-filter-container">
            <div className="mail-filter">
                <div className="search">
                    <img src="assets/img/magnifying_glass.svg" alt="" />
                    <input 
                        onChange={handleChange} 
                        value={filterByToEdit.txt || ''} 
                        name="txt" 
                        type="text" 
                        placeholder="Search mail"
                    />
                </div>
                <div className="action-icon search-options-icon" onClick={toggleSearchOptions}>
                    <img src="assets/img/search_options.svg" alt="Search options" />
                    <span className="action-name">Show search options</span>
                </div>
            </div>
            {showSearchOptions && (
                <div className="additional-filter-options">
                    <h1>Filtering and sorting</h1>
                    <div className="search-options">
                        <label htmlFor="read-status">Read Status: </label>
                        <select
                            id="read-status"
                            name="isRead"
                            value={filterByToEdit.isRead || ''}
                            onChange={handleChange}
                        >
                            <option value="">All</option>
                            <option value="true">Read</option>
                            <option value="false">Unread</option>
                        </select>
                    </div>
                    <div className="sorting-options">
                        <label htmlFor="sort-by">Sort By: </label>
                        <select
                            id="sort-by"
                            name="sortBy"
                            value={sortBy}
                            onChange={handleSortChange}
                        >
                            <option value="date">Date</option>
                            <option value="title">Title</option>
                        </select>
                    </div>
                    {/* <button onClick={toggleSearchOptions}>Search</button> */}
                    <button onClick={toggleSearchOptions}>X</button>
                </div>
            )}
        </section>
    )
}
