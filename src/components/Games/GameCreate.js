import { Button, Grid, Input, InputAdornment, InputLabel, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { createGame } from '../../api/games'
import messages from '../AutoDismissAlert/messages'

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
        props.msgAlert({ message: messages.gameCreateSuccess })
        setCreatedId(res.data.game.id)
      })
      .catch(() => props.msgAlert({ message: messages.gameCreateFailure }))
  }

  const handleChange = e => {
    setGame({ ...game, [e.target.name]: e.target.value })
  }

  return (
    <Grid container justify="center">
      {createdId && (<Redirect to={`/games/${createdId}`}/>)}
      <h2 style={{ marginTop: 20 }}>Add New Game</h2>
      <form onSubmit={handleSubmit}>
        <Grid container justify="center">
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
          <p>Please specify where the game can be found and the general gameplay. Thank you!</p>
          <TextField
            name="description"
            label="Description"
            type="textarea"
            variant="outlined"
            placeholder="Description"
            value={game.description}
            multiline
            rows={10}
            required
            style={{ margin: 20 }}
            fullWidth
            onChange={handleChange}
          />
          <InputLabel htmlFor="price">Regular Price</InputLabel>
          <Input
            id="price"
            name="price"
            type="number"
            variant="outlined"
            value={game.price}
            required
            style={{ margin: 20 }}
            fullWidth
            onChange={handleChange}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
          <Button type="submit" variant="contained" color="secondary">Create</Button>
        </Grid>
      </form>
    </Grid>
  )
}

export default GameCreate
