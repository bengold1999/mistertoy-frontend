import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"


import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

import { savetoy } from "../store/actions/toy.actions.js"

export function ToyEdit() {
    const navigate = useNavigate()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptytoy())
    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) loadToy()
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToyToEdit(toy))
            .catch(err => {
                console.log('had issues in toy Edit', err)
                navigate('/toy')
            })
    }
    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        if (!toyToEdit.price) toyToEdit.price = 30
        savetoy(toyToEdit)
            .then(() => {
                showSuccessMsg('Toy Saved!')
                navigate('/toy')
            })
            .catch(err => {
                console.log('Had issues in Toy details', err)
                showErrorMsg('Had issues in Toy details')
            })
    }

    console.log(typeof toyToEdit.inStock)
    return (
        <section className="toy-edit">
            <h2>{toyToEdit._id ? 'Edit' : 'Add'} toy</h2>

            <form onSubmit={onSaveToy} >
                <label htmlFor="name">name: </label>
                <input type="text"
                    name="name"
                    id="name"
                    placeholder="Enter name..."
                    value={toyToEdit.name}
                    onChange={handleChange}
                />
                <label htmlFor="price">Price : </label>
                <input type="number"
                    name="price"
                    id="price"
                    placeholder="Enter price"
                    value={toyToEdit.price}
                    onChange={handleChange}
                />
                {/* <label htmlFor="labels">labels : </label>
                <input type="text"
                    name="labels"
                    id="labels"
                    placeholder="Enter price"
                    value={toyToEdit.labels}
                    onChange={handleChange}
                /> */}
                <div className="radio-sort ">
                    <label htmlFor="all">

                        <input defaultChecked type="radio" name="inStock" value={true} id="all" onChange={handleChange} />
                        in stock
                    </label>
                    <label htmlFor="done">

                        <input type="radio" name="inStock" value='' id="inStock" onChange={handleChange} />
                        out of stock
                    </label>
                </div>
                <div>
                    <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                    <Link to="/toy">Cancel</Link>
                </div>
            </form>
        </section>
    )
}