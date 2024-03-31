import { ToyPreview } from "./ToyPreview.jsx"


export function ToyList({ toys, onRemoveToy, onEditToy, user }) {
    if (!user) return (<ul className="toy-list  ">
        {toys.map(toy =>
            <li className="toy-preview" key={toy._id}>
                <ToyPreview toy={toy} />



            </li>
        )}
    </ul>
    )
    return (
        <ul className="toy-list  ">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy}
                    user={user} />

                    <div>{user.isAdmin ? (
                        <button className="remove-btn" onClick={() => onRemoveToy(toy._id)}>x</button>) : ''

                    }
                    </div>
                </li>
            )}
        </ul>
    )
}