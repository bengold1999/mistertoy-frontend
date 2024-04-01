import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'

import { Link, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"
import { ToyMsgs } from '../cmps/ToyMsgs.jsx'
import toyImg from '../assets/img/toy.png'
import { ADD_TOY_TO_CART } from '../store/reducers/toy.reducer.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadReviews, addReview, removeReview, getActionAddReview } from '../store/actions/review.actions'

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const dispatch = useDispatch()
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)


    useEffect(() => {
        if (toyId) {
            loadReviews()
            loadToy()
        }
    }, [toyId])


    function onMessageSaved() {
        loadToy()
    }

    function addToCart(toy) {
        dispatch({ type: ADD_TOY_TO_CART, toy })
        showSuccessMsg('Added to Cart')
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
    const reviewsfilterd = reviews.filter((review) => review.toy._id === toy._id)
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
                    <button><Link className="add-btn" to={`/toy`}>Back</Link></button>
                    {!user ? '' :
                        (
                            user.isAdmin ? (<button><Link className="add-btn" to={`/toy/edit/${toy._id}`}>Edit</Link></button>) : toy.inStock && (<button className="add-btn" onClick={() => {
                                addToCart(toy)
                            }}>Add to Cart</button>)
                        )}
                </section>
            </section>
            <article className="msg-editor">
                <h1>Messages </h1>
                <ToyMsgs toy={toy} onMessageSaved={onMessageSaved} user={user} />
                {toy.msgs && (
                    <div className="msg-container">
                        {toy.msgs.map((msg) => (
                            <article key={msg.id} className="message">
                                {/* <p>Msg id: {msg.id}</p> */}
                                <h4> Added by : <span> {msg.by.fullname}</span></h4>
                                <pre>Message: {msg.txt}</pre>
                                {user && user.isAdmin ? (< button onClick={() => onDeleteMsg(msg)}>Delete</button>) : ''}
                                {/* <p></p> */}
                                {/* <p>Msg user id: {msg.by._id}</p> */}
                            </article>
                        ))}
                    </div>
                )}
            </article >
            <article className="msg-editor">
                <h1> <Link to={'/review'}>Reviews</Link></h1>

                <div className="msg-container">
                    {reviewsfilterd && reviewsfilterd.map((review) => (
                        <article key={review._id} className="message">
                            {/* <p>Msg id: {msg.id}</p> */}
                            <h4> Added by : <span> {review.user.fullname}</span></h4>
                            <pre>review: {review.txt}</pre>
                            {/* {user && user.isAdmin ? (< button onClick={() => onDeleteMsg(review)}>Delete</button>) : ''} */}
                            {/* <p></p> */}
                            {/* <p>Msg user id: {msg.by._id}</p> */}
                        </article>
                    ))}
                </div>

            </article >
        </>

    )
}