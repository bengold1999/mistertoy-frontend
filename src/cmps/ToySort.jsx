import { useEffect, useState } from "react"


export function ToySort({ onSetSort, sortBy }) {
    const [sortByToEdit, setSortByToEdit] = useState({ ...sortBy })

    useEffect(() => {
        onSetSort(sortByToEdit)
    }, [sortByToEdit])

    function handleChange({ target }) {
        const field = target.name
        const value = target.value

        if (field === 'dir')
            setSortByToEdit(prevSort => ({
                ...prevSort,
                dir: -prevSort.dir,
            }))
        else
            setSortByToEdit(prevSort => ({
                ...prevSort,
                [field]: value,
            }))
    }

    console.log(sortByToEdit)
    return (
        <form className="toy-sort">
            Sort By
            <select className="sort-type input "
                name="type"
                value={sortByToEdit.type}
                onChange={handleChange}>
                
                <option value={''}>----</option>
                <option value="name">Name</option>
                <option value="createdAt">Date</option>
                <option value="price">Price</option>
            </select>
            <label>
                <input className="cl-checkbox" type="checkbox"
                    name="dir"
                    value={!sortByToEdit.dir === -1}
                    onChange={handleChange} />
                Descending
            </label>
        </form>
    )
}