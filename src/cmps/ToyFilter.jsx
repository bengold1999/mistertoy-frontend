
import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { toyService } from "../services/toy.service.js"
import { useEffectUpdate } from "../customHooks/useEffectUpdate.js"
import { LabelSelector } from './LabelSelect.jsx'

export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))
    const labels = toyService.getLabels()


    useEffectUpdate(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target;
        if (type === 'checkbox') value = target.checked
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    // console.log(filterByToEdit)

    function onLabelChange(selectedLabels) {
        setFilterByToEdit(prevFilter => ({
            ...prevFilter,
            labels: selectedLabels,
        }))
    }

    return (
        <section className="Toy-filter full main-layout">
            <form >
                <label htmlFor="name">Toy name:</label>
                <input type="text"
                    id="name"
                    name="txt"
                    placeholder="By name"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />

                <label htmlFor="inStock">In Stock:</label>
                <input
                    type="checkbox"
                    id="inStock"
                    name="inStock"
                    value={filterByToEdit.inStock}
                    onChange={handleChange}
                />
                <LabelSelector labels={labels} onLabelChange={onLabelChange} />
            </form>

        </section>
    )
}