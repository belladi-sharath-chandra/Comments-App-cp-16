// Write your code here
import {formatDistanceToNow} from 'date-fns'

import './index.css'

const commentItem = props => {
  const {commentDetails} = props
  const {id, name, comment, date, isLiked, initialClassName} = commentDetails
  const initialName = name ? name[0].toUpperCase() : ''
  const postedTime = formatDistanceToNow(date)
  const likeImageUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const likeTextClassName = isLiked ? 'button active' : 'button'

  const onClickLike = () => {
    const {toggleIsLiked} = props
    toggleIsLiked(id)
  }

  const onDeleteComment = () => {
    const {deleteComment} = props
    deleteComment(id)
  }
  return (
    <li className="list">
      <div className="row-container">
        <div className={initialClassName}>
          <p>{initialName}</p>
        </div>
        <div className="row-2">
          <div className="name-container">
            <p className="name">{name}</p>
            <p className="time">{postedTime} ago</p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="like-dlt">
        <div className="like">
          <img src={likeImageUrl} alt="like" className="img" />
          <button
            className={likeTextClassName}
            type="button"
            onClick={onClickLike}
          >
            Like
          </button>
        </div>
        <button
          className="delete-btn"
          onClick={onDeleteComment}
          type="button"
          testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            className="delete-icon"
            alt="delete"
          />
        </button>
      </div>
      <hr className="comment-line" />
    </li>
  )
}

export default commentItem
