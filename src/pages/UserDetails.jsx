import { useEffect, useState } from "react"
import { userService } from "../services/user.service.js"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'


// const { useEffect, useState } = React
// const { Link, useParams, useNavigate } = ReactRouterDOM


export function UserDetails() {
    const [user, setUser] = useState(null)
    const { userId } = useParams()
    const navigate = useNavigate()
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)
    

    useEffect(() => {
        if (userId) loadUser()
    }, [userId])

    function loadUser() {
        userService.getById(userId)
            .then(user => {
                console.log('user:', user)
                setUser(user)
            })
            .catch(err => {
                console.log('Had issues in user details', err)
                navigate('/')
            })
    }


    if (!user) return <div>Loading...</div>
    const reviewsfilterd = reviews.filter((review) => review.user._id === user._id)

    const loggedInUser = userService.getLoggedinUser()
    const isMyProfile = loggedInUser && loggedInUser._id === userId
    return (
        <section className="user-details">
            <h1>Fullname: {user.fullname}</h1>
            <h5>Score: ${user.score}</h5>
            {isMyProfile && (
                <section>
                </section>
            )}
            <p>User is so lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>
                    <Link to="/">Home</Link>
            <article className="msg-editor">
                <h1> <Link to={'/review'}>Reviews by user</Link></h1>

                <div className="msg-container">
                    {reviewsfilterd && reviewsfilterd.map((review) => (
                        <article key={review._id} className="message">
                            {/* <p>Msg id: {msg.id}</p> */}
                            <h4> by : <span> {review.user.fullname}</span></h4>
                            <pre>reviews: {review.txt}</pre>
                            {/* {user && user.isAdmin ? (< button onClick={() => onDeleteMsg(review)}>Delete</button>) : ''} */}
                            {/* <p></p> */}
                            {/* <p>Msg user id: {msg.by._id}</p> */}
                        </article>
                    ))}
                </div>

            </article >
        </section>
    )
}