import {ToyPreview} from "./ToyPreview.jsx"

export function ToyList({toys,onRemoveToy,onEditToy}) {
    return (
        <ul className="toy-list">
            {toys.map(toy => 
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} />

                    <div>
                        <button onClick={() => onRemoveToy(Toy._id)}>x</button>
                        <button onClick={() => onEditToy(Toy)}>Edit</button>
                    </div>
                </li>
            )}
        </ul>
    )
}