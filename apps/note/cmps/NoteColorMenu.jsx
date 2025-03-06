export function NoteColorMenu({onSetNoteColor, onClose}){
    const def = 'white'
    const coral = '#faafa8'
    const peach = '#f39f76'
    const sand = '#fff8b8'
    const mint = '#e2f6d3'
    const sage = '#b4ddd3'
    const fog =  '#d4e4ed'
    const storm= '#aeccdc'
    const dusk= '#d3bfdb'
    const blossom= '#f6e2dd'
    const clay= '#e9e3d4'
    const chalk= '#efeff1'

    const colors = [def, coral, peach, sand, mint, sage, fog, storm, dusk, blossom, clay, chalk]

    function onSetColor(color) {
        onSetNoteColor(color)
    }


    return <section className="note-color-menu">
        <div className="colors">
                {colors.map(color => (
                    <div
                        key={color}
                        // className={`item ${backgroundColor === color ? 'chosen' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => onSetColor(color)}
                    >
                    </div>
                ))}
            </div>
    </section>

    
}