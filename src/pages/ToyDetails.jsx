import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"
import { ToyMsgs } from '../cmps/ToyMsgs.jsx'
import toyImg from '../assets/img/toy.png'

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    function onMessageSaved() {
        loadToy()
    }

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log('had issues in toy details')
            })
    }
    async function onDeleteMsg(msg) {

        try {
            await toyService.removeMsg(toy._id, msg)
            // setMsg('')
            onMessageSaved()
        } catch (err) {
            console.error('Failed to save message', err)
        }
    }

    if (!toy) return <div>loading...</div>
    return (
        <>
        <section className="toy-details">
            <h1>Toy name: {toy.name}</h1>
            <img className="details-img" src={toyImg} alt="" />
            <h3>price: {toy.price}$</h3>
            <h4>labels: {toy.labels.join(',')}</h4>
            <p><span>Description:</span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quas qui quibusdam dignissimos quisquam distinctio officiis nobis possimus rem consequatur.</p>
            <h4>in stock : {toy.inStock ? 'yes' : 'no'}</h4>
            <section>
                <button><Link className="add-btn" to={`/toy/edit/${toy._id}`}>Edit</Link></button>
                <button><Link className="add-btn" to={`/toy`}>Back</Link></button>
            </section>
            </section>
            <article className="msg-editor">
                <h1>Messages </h1>
            <ToyMsgs toy={toy} onMessageSaved={onMessageSaved} />
            {toy.msgs && (
                <div className="msg-container">
                    {toy.msgs.map((msg) => (
                        <article key={msg.id} className="message">
                            {/* <p>Msg id: {msg.id}</p> */}
                            <h4> Added by : <span> {msg.by.fullname}</span></h4>
                            <pre>Message: {msg.txt}</pre>
                            <button onClick={() => onDeleteMsg(msg)}>Delete</button>
                            {/* <p></p> */}
                            {/* <p>Msg user id: {msg.by._id}</p> */}
                        </article>
                    ))}
                </div>
            )}
            </article>
            </>
       
    )
}