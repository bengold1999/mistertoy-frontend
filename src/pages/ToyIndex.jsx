import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { useEffect,useState  } from 'react'

import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadtoys, removetoyOptimistic, savetoy, setFilterBy } from '../store/actions/toy.actions.js'
// import { ADD_TOY_TO_toyT } from '../store/reducers/TOY.reducer.js'


export function ToyIndex(){
    const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const sortBy = useSelector(storeState => storeState.toyModule.sortBy)
   
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    useEffect(()=>{
        loadtoys()
        .catch(err => {
            showErrorMsg('Cannot load toys!')
        })
    }, [filterBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }
    

    function onRemoveToy(toyId) {
        removetoyOptimistic(toyId)
            .then(() => {
                showSuccessMsg('toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }

    function onAddToy() {
        const toyToSave = toyService.getEmptyRandomtoy()
        savetoy(toyToSave)
            .then((savedtoy) => {
                showSuccessMsg(`toy added (id: ${savedtoy._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot add toy')
            })
    }

    // function onEditToy(toy) {
    //     const price = +prompt('New price?')
    //     const toyToSave = { ...toy, price }

    //     savetoy(toyToSave)
    //         .then((savedtoy) => {
    //             showSuccessMsg(`toy updated to price: $${savedtoy.price}`)
    //         })
    //         .catch(err => {
    //             showErrorMsg('Cannot update toy')
    //         })
    // }
    console.log(toys)

    return (
        <div>
            <h3>Toys App</h3>
            <main>
                <Link to="/toy/edit">Add toy</Link>
                <button className='add-btn' onClick={onAddToy}>Add Random toy</button>
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                {!isLoading
                    ? <ToyList
                        toys={toys}
                        onRemoveToy={onRemoveToy}
                        // onEditToy={onEditToy}
                        // addTotoyt={addTotoyt}
                        // txt={'123'}
                        // nums={[1, 2 ,3]}
                        // baba='hello'
                    />
                    : <div>Loading...</div>
                }
                <hr />
            </main>
        </div>
    )
}