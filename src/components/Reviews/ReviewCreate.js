import { Button, Container, TextField } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { createReview } from '../../api/reviews'

const ReviewCreate = props => {
  const [review, setReview] = useState({
    head: '',
    body: '',
    rating: 3,
    game_id: props.match.params.gameId
  })
  const [created, setCreated] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()

    createReview(review, props.user.token)
      .then(() => {
        setCreated(true)
      })
      .catch(console.error)
  }

  const handleChange = e => {
    console.log(e.target.value)
    setReview({ ...review, [e.target.name]: e.target.value })
  }

  return (
    <Container>
      {created && (<Redirect to={`/games/${review.game_id}`}/>)}
      <h2>Add New Review</h2>
      <form onSubmit={handleSubmit}>
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
        <TextField
          name="body"
          label="Description"
          type="textarea"
          variant="outlined"
          placeholder="Description"
          value={review.body}
          required
          style={{ margin: 20 }}
          fullWidth
          onChange={handleChange}
        />
        <h5>Rating</h5>
        <Rating
          name="rating"
          precision={0.5}
          value={review.rating}
          style={{ margin: 20 }}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="secondary">Create</Button>
      </form>
    </Container>
  )
}

export default ReviewCreate
