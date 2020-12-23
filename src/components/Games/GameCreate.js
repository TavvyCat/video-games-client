import { Button, Container, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { createGame } from '../../api/games'

const GameCreate = props => {
  const [game, setGame] = useState({
    title: '',
    description: '',
    price: 0
  })
  const [createdId, setCreatedId] = useState(null)

  const handleSubmit = e => {
    e.preventDefault()

    createGame(game, props.user.token)
      .then(res => {
        setCreatedId(res.data.game.id)
      })
      .catch(console.error)
  }

  const handleChange = e => {
    setGame({ ...game, [e.target.name]: e.target.value })
  }

  return (
    <Container>
      {createdId && (<Redirect to={`/games/${createdId}`}/>)}
      <h2>Add New Game</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          name="title"
          label="Title"
          type="text"
          variant="outlined"
          placeholder="Game Title"
          value={game.title}
          required
          style={{ margin: 20 }}
          fullWidth
          onChange={handleChange}
        />
        <TextField
          name="description"
          label="Description"
          type="textarea"
          variant="outlined"
          placeholder="Description"
          value={game.description}
          required
          style={{ margin: 20 }}
          fullWidth
          onChange={handleChange}
        />
        <TextField
          name="price"
          label="Normal Price"
          type="number"
          variant="outlined"
          value={game.price}
          required
          style={{ margin: 20 }}
          fullWidth
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="secondary">Create</Button>
      </form>
    </Container>
  )
}

export default GameCreate
