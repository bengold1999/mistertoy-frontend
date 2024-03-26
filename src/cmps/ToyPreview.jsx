import { Link } from "react-router-dom";

export function ToyPreview({ toy }) {
    return (
        <article>
            <img className="preview-img" src="src\assets\img\toy.png" alt="" />
            <h3>{toy.name}</h3>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            {/* {toy.owner && <p>Owner: <Link to={`/user/${toy.owner._id}`}>{toy.owner.fullname}</Link></p>} */}
            <button><Link className="add-btn" to={`/toy/edit/${toy._id}`}>Edit</Link></button>
            <button><Link className="add-btn" to={`/toy/${toy._id}`}>Details</Link></button>
        </article>
    )
}