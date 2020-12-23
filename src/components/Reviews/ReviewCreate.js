import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Grid, TextField } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { createReview } from '../../api/reviews'
import messages from '../AutoDismissAlert/messages'

const ReviewCreate = props => {
  const [review, setReview] = useState({
    head: '',
    body: '',
    rating: 3,
    game_id: props.match.params.gameId
  })
  const [created, setCreated] = useState(false)
  const msgAlert = props.msgAlert

  const handleSubmit = e => {
    e.preventDefault()

    createReview(review, props.user.token)
      .then(() => {
        msgAlert({ message: messages.reviewCreateSuccess })
        setCreated(true)
      })
      .catch(() => msgAlert({ message: messages.reviewCreateFailure }))
  }

  const handleChange = e => {
    setReview({ ...review, [e.target.name]: e.target.value })
  }

  return (
    <Grid container justify="center">
      {created && (<Redirect to={`/games/${review.game_id}`}/>)}
      <Grid item xs={12}>
        <h2 style={{ marginTop: 20, textAlign: 'center' }}>Add New Review</h2>
      </Grid>
      <form onSubmit={handleSubmit}>
        <Grid container justify="center">
          <Grid item xs={12} lg={10}>
            <TextField
              name="head"
              label="Title"
              type="text"
              variant="outlined"
              placeholder="Review Title"
              value={review.head}
              required
              style={{ margin: 20 }}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} lg={10}>
            <TextField
              name="body"
              label="Description"
              type="textarea"
              variant="outlined"
              placeholder="Description"
              value={review.body}
              required
              multiline
              rows={10}
              style={{ margin: 20 }}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <h6 style={{ margin: 0, textAlign: 'center' }}>Rating</h6>
          </Grid>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Rating
              name="rating"
              precision={0.5}
              value={parseFloat(review.rating)}
              style={{ margin: 20 }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Button type="submit" variant="contained" color="secondary">Create</Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  )
}

export default ReviewCreate
