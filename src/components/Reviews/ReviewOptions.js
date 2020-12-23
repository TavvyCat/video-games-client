import React, { useState, useEffect } from 'react'
import { TextField, Button, Paper, Grid } from '@material-ui/core'
import { useCookies } from 'react-cookie'
import { deleteReview, showReview, updateReview } from '../../api/reviews'
import { Rating } from '@material-ui/lab'

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
      .then(() => console.log(review.game_id))
  }, [])

  const handleSubmit = e => {
    e.preventDefault()

    updateReview(id, review, token)
      .then(() => props.closeModal())
      .catch(console.error)
  }

  const handleChange = e => {
    setReview({ ...review, [e.target.name]: e.target.value })
  }

  const handleDelete = () => {
    deleteReview(id, token)
      .then()
  }

  return (
    <Paper>
      <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              name="head"
              label="Head"
              type="text"
              variant="outlined"
              placeholder="Review Head"
              value={review.head}
              required
              style={{ margin: 20 }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="body"
              label="body"
              type="text"
              variant="outlined"
              placeholder="body"
              value={review.body}
              required
              rows={10}
              style={{ margin: 20 }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Rating
              name="rating"
              precision={0.5}
              value={parseFloat(review.rating)}
              style={{ margin: 20 }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="secondary" className="mb-4">Update</Button>
          </Grid>
          <Grid item xs={12}>
            <h4>Delete Comment</h4>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleDelete}>Delete</Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  )
}

export default ReviewOptions
