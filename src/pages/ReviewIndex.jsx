import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
// import { socketService, SOCKET_EVENT_REVIEW_ADDED } from '../services/socket.service'

import { loadReviews, addReview, removeReview, getActionAddReview } from '../store/actions/review.actions'
import { loadUsers } from '../store/actions/user.actions'
import { loadtoys } from '../store/actions/toy.actions'

export function ReviewIndex() {

  const users = useSelector(storeState => storeState.userModule.users)
  const toys = useSelector(storeState => storeState.toyModule.toys)
  const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
  const reviews = useSelector(storeState => storeState.reviewModule.reviews)
  const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
  const sortBy = useSelector(storeState => storeState.toyModule.sortBy)

  const [reviewToEdit, setReviewToEdit] = useState({ txt: '', toyId: '' })
  const [localReviews, setLocalReviews] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    loadUsers()
    loadtoys(filterBy, sortBy)
    // socketService.on(SOCKET_EVENT_REVIEW_ADDED, (review) => {
    //   console.log('GOT from socket', review)
    // dispatch(getActionAddReview(reviewToEdit))
    // })

  }, [localReviews])

  useEffect(() => {
    loadReviews()
  }, [localReviews])

  const handleChange = ev => {
    const { name, value } = ev.target
    setReviewToEdit({ ...reviewToEdit, [name]: value })
  }

  const onAddReview = async ev => {
    ev.preventDefault()
    if (!reviewToEdit.txt || !reviewToEdit.toyId) return alert('All fields are required')
    try {

      const newReview = await addReview(reviewToEdit)
      showSuccessMsg('Review added')
      setReviewToEdit({ txt: '', toyId: '' })
      setLocalReviews(prev => [...prev, newReview])
    } catch (err) {
      // showErrorMsg('Cannot add review')
    }
  }
  const onRemove = async reviewId => {
    try {
      await removeReview(reviewId)
      showSuccessMsg('Review removed')
    } catch (err) {
      showErrorMsg('Cannot remove')
    }
  }

  function canRemove(review) {
    if (!loggedInUser) return false
    return review.user._id === loggedInUser._id || loggedInUser.isAdmin
  }

  if (!reviews) return <div>loading...</div>
  if (!localReviews) return <div>no reviews for now...</div>

  return (
    <div className="review-index">
      <h1>Reviews and Gossip</h1>
      {reviews && <ul className="review-list">
        {reviews.map(review => (
          <li key={review._id}>
            {canRemove(review) &&
              <button onClick={() => onRemove(review._id)}>X</button>}
            <p>
              About:
              <Link to={`/toy/${review.toy._id}`}>
                {review.toy.name}
              </Link>
            </p>
            <h3><pre>{review.txt}</pre></h3>
            <p>
              By:
              <Link to={`/user/${review.user._id}`}>
                {review.user.fullname}
              </Link>
            </p>
          </li>
        ))}
      </ul>}
      {users && loggedInUser &&
        <form onSubmit={onAddReview}>
          <select
            onChange={handleChange}
            value={reviewToEdit.toyId}
            name="toyId"
          >
            <option value="">Select Toy</option>
            {toys.map(toy => (
              <option key={toy._id} value={toy._id}>
                {toy.name}
              </option>
            ))}
          </select>
          <textarea
            name="txt"
            onChange={handleChange}
            value={reviewToEdit.txt}
          ></textarea>
          <button>Add</button>
        </form>}
      <hr />
    </div>
  )
}