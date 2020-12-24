import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { TextField, Button, Paper, Grid } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { deleteReview, showReview, updateReview } from '../../api/reviews'
import messages from '../AutoDismissAlert/messages'

const ReviewOptions = props => {
  const [review, setReview] = useState({
    head: '',
    body: '',
    rating: 0,
    game_id: null
  })

  const [cookies] = useCookies(['user'])
  const id = props.reviewId
  const token = cookies.user.token
  const msgAlert = props.msgAlert

  useEffect(() => {
    showReview(id, token)
      .then(res => {
        const reviewData = res.data.review
        setReview({
          head: reviewData.head,
          body: reviewData.body,
          rating: reviewData.rating,
          game_id: reviewData.game_id
        })
      })
  }, [])

  const handleSubmit = e => {
    e.preventDefault()

    updateReview(id, review, token)
      .then(() => msgAlert({ message: messages.reviewUpdateSuccess }))
      .then(props.closeModal())
      .catch(() => msgAlert({ message: messages.reviewUpdateFailure }))
  }

  const handleChange = e => {
    setReview({ ...review, [e.target.name]: e.target.value })
  }

  const handleDelete = () => {
    deleteReview(id, token)
      .then(() => msgAlert({ message: messages.reviewDeleteSuccess }))
      .then(props.closeModal())
      .catch(() => msgAlert({ message: messages.reviewDeleteFailure }))
  }

  return (
    <Paper>
      <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
        <Grid container justify="center">
          <Grid item xs={12}>
            <h4 style={{ marginTop: 10 }}>Update Review</h4>
          </Grid>
          <Grid item xs={10}>
            <TextField
              name="head"
              label="Head"
              type="text"
              variant="outlined"
              placeholder="Review Head"
              value={review.head}
              required
              fullWidth
              style={{ margin: 10 }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={10}>
            <TextField
              name="body"
              label="Body"
              type="text"
              variant="outlined"
              placeholder="Your review here..."
              value={review.body}
              required
              fullWidth
              multiline
              rows={10}
              style={{ margin: 10 }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Rating
              name="rating"
              precision={0.5}
              value={parseFloat(review.rating)}
              style={{ margin: 5 }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="secondary" className="mb-4">Update</Button>
          </Grid>
          <Grid item xs={12}>
            <h4>Delete Comment</h4>
          </Grid>
          <Grid item xs={12} style={{ marginBottom: 10 }}>
            <Button variant="contained" color="primary" onClick={handleDelete}>Delete</Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  )
}

export default ReviewOptions
