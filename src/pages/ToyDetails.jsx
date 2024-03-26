import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])


    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log('had issues in toy details')
            })
    }

    if (!toy) return <div>loading...</div>
    return (
        <section className="toy-details">
            <h1>Toy name:{toy.name}</h1>
            <h3>price: {toy.price}$</h3>
            <h4>labels:{toy.labels.join(',')}</h4>
            <p><span>Description:</span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quas qui quibusdam dignissimos quisquam distinctio officiis nobis possimus rem consequatur.</p>
            <h4>in stock : {toy.inStock ? 'yes' : 'no'}</h4>
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
            <Link to={`/toy`}>Back</Link>

        </section>
    )
}