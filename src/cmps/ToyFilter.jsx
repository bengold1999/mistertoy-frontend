
import { useEffect, useRef, useState } from "react"
import TextField from '@mui/material/TextField'
import { utilService } from "../services/util.service.js"
import { toyService } from "../services/toy.service.js"
import { useEffectUpdate } from "../customHooks/useEffectUpdate.js"
import { LabelSelect } from './LabelSelect.jsx'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


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

    return (
        <section className="toy-filter">
            <FormControl className="" >
                <label htmlFor="name"></label>
                <TextField className="input" type="text"
                    id="name"
                    name="txt"
                    placeholder="By name"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />

                {/* <div className="radio-sort cl-checkbox "> */}
                <FormControl fullWidth>
                    <InputLabel>stock</InputLabel>
                    <Select
                        onChange={handleChange}
                        name="inStock"
                        // displayEmpty
                        value={filterByToEdit.inStock || ""}>
                        <MenuItem value="">all</MenuItem >
                        <MenuItem value={true}>In stock</MenuItem >
                        <MenuItem value={false}>Out of stock</MenuItem >
                    </Select>
                </FormControl>

                <LabelSelect selectedLabels={filterByToEdit.labels} labels={labels} onLabelChange={onLabelChange} />

                {/* </div> */}
            </FormControl >

        </section>
    )
}