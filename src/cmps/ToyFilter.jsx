
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
        let { value, name: field, type } = target
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

    console.log(filterByToEdit)
    return (
        <section>
            <form className="" >
                <label htmlFor="name">Toy name:</label>
                <input className="input" type="text"
                    id="name"
                    name="txt"
                    placeholder="By name"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />

                <div className="radio-sort cl-checkbox ">
                <span >In stock</span>
                    <select
                        onChange={handleChange}
                        name="inStock"
                        value={filterByToEdit.inStock || ""}>
                        <option value=""> All </option>
                        <option value={true}>In stock</option>
                        <option value={false}>Out of stock</option>
                    </select>
                </div>
                <LabelSelector selectedLabels={filterByToEdit.labels} labels={labels} onLabelChange={onLabelChange} />
            </form>

        </section>
    )
}