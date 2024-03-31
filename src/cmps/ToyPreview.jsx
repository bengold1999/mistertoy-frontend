import { Link } from "react-router-dom";
import toyImg from '../assets/img/toy.png'

export function ToyPreview({ toy, user }) {
    if (!user) return (
        <article className={toy.inStock ? "preview-card" : "preview-card outStock"}>
            <img className={toy.inStock ? 'preview-img' : "preview-img outStock"} src={toyImg} alt="" />
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
            <img className={toy.inStock ? 'preview-img' : "preview-img outStock"} src={toyImg} alt="" />
            <h3>{toy.name}</h3>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            {/* {toy.owner && <p>Owner: <Link to={`/user/${toy.owner._id}`}>{toy.owner.fullname}</Link></p>} */}
            <section className="btn-preview">
                {user.isAdmin ? (<button><Link className="add-btn" to={`/toy/edit/${toy._id}`}>Edit</Link></button>) : ''}
                <button><Link className="add-btn" to={`/toy/${toy._id}`}>Details</Link></button>
            </section>
        </article>
    )
}