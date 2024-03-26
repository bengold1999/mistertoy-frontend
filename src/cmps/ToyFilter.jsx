
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
                    <label htmlFor="all">

                        <input defaultChecked type="radio" name="inStock" value="all" id="all" onChange={handleChange} />
                        All
                    </label>
                    <label htmlFor="done">

                        <input type="radio" name="inStock" value="inStock" id="inStock" onChange={handleChange} />
                        in stock
                    </label>
                    <label htmlFor="undone">
                        <input type="radio" name="inStock" value="" id="notinStock" onChange={handleChange} />
                        not in stock
                    </label>
                </div>
                <LabelSelector selectedLabels={filterByToEdit.labels} labels={labels} onLabelChange={onLabelChange} />
            </form>

        </section>
    )
}