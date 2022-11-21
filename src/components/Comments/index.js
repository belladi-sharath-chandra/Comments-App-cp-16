import {Component} from 'react'
import './index.css'
import {v4} from 'uuid'
import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here

class Comments extends Component {
  state = {name: ' ', comment: ' ', commentsList: []}

  deleteComment = commentId => {
    const {commentsList} = this.state

    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== commentId),
    })
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }

        return eachComment
      }),
    }))
  }

  renderCommentsList = () => {
    const {commentsList} = this.state

    return commentsList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        toggleIsLiked={this.toggleIsLiked}
        deleteComment={this.deleteComment}
      />
    ))
  }

  onAddComment = event => {
    event.preventDefault()
    const {name, comment} = this.state
    const initialBackgroundClassNames = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: v4(),
      name,
      comment,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundClassNames,
    }
    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      name: '',
      comment: '',
    }))
  }

  onChangeNameInput = event => {
    this.setState({name: event.target.value})
  }

  onChangeCommentInput = event => {
    this.setState({comment: event.target.value})
  }

  render() {
    const {name, comment, commentsList} = this.state
    return (
      <div className="bg">
        <h1 className="heading">Comments</h1>
        <div className="row-container">
          <form className="row-1" onSubmit={this.onAddComment}>
            <div className="new">
              <p className="para">Say something about 4.0 technologies</p>
              <input
                type="text"
                className="input"
                placeholder="Your Name"
                value={name}
                onChange={this.onChangeNameInput}
              />
              <textarea
                className="input"
                placeholder="Your Comment"
                value={comment}
                rows="6"
                onChange={this.onChangeCommentInput}
              />
              <button type="submit" className="btn">
                Add Comment
              </button>
            </div>
          </form>
          <div className="row-2">
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="img"
            />
          </div>
        </div>
        <hr className="line" />
        <p className="num-comments">
          <span className="span">{commentsList.length}</span>Comments
        </p>
        <ul className="ul">{this.renderCommentsList()}</ul>
      </div>
    )
  }
}

export default Comments
