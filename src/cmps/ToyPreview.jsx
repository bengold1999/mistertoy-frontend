import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import toyImg from '../assets/img/toy1.png'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { ADD_TOY_TO_CART } from '../store/reducers/toy.reducer.js'

export function ToyPreview({ toy, user }) {
    const dispatch = useDispatch()

    function addToCart(toy) {
        dispatch({ type: ADD_TOY_TO_CART, toy })
        showSuccessMsg('Added to Cart')
    }
    console.log(toy.img)
    if (!user) return (
        <article className={toy.inStock ? "preview-card" : "preview-card outStock"}>
            <img className={toy.inStock ? 'preview-img' : "preview-img outStock"} src={toy.img ? toy.img : toyImg} alt="" />
            <h3>{toy.name}</h3>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            {/* {toy.owner && <p>Owner: <Link to={`/user/${toy.owner._id}`}>{toy.owner.fullname}</Link></p>} */}
            <section className="btn-preview">
                <button><Link className="add-btn" to={`/toy/${toy._id}`}>Details</Link></button>
            </section>
        </article>
    )
    return (
        <article className={toy.inStock ? "preview-card" : "preview-card outStock"}>
            <img className={toy.inStock ? 'preview-img' : "preview-img outStock"} src={toy.img ? toy.img : toyImg} alt="" />
            <h3>{toy.name}</h3>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            {/* {toy.owner && <p>Owner: <Link to={`/user/${toy.owner._id}`}>{toy.owner.fullname}</Link></p>} */}
            <section className="btn-preview">
                <button><Link className="add-btn" to={`/toy/${toy._id}`}>Details</Link></button>
                {user.isAdmin ? (<button><Link className="add-btn" to={`/toy/edit/${toy._id}`}>Edit</Link></button>) : toy.inStock && (<button className="add-btn" onClick={() => {
                    addToCart(toy)
                }}>Add to Cart</button>)}
            </section>
        </article>
    )
}