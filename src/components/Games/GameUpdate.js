import { Container, TextField, Button } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { showGame, updateGame } from '../../api/games'

const GameUpdate = props => {
  const [game, setGame] = useState({
    title: '',
    description: '',
    price: 0
  })

  const id = props.match.params.id

  useEffect(() => {
    showGame(id)
      .then(res => {
        const gameData = res.data.game
        setGame({
          title: gameData.title,
          description: gameData.description,
          price: gameData.price
        })
      })
  }, [])

  const handleSubmit = e => {
    e.preventDefault()

    updateGame(id, game)
      .then(console.log)
      .catch(console.error)
  }

  const handleChange = e => {
    setGame({ ...game, [e.target.name]: e.target.value })
  }

  return (
    <Container>
      <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
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
        <Button type="submit" variant="contained" color="secondary">Update</Button>
      </form>
    </Container>
  )
}

export default GameUpdate
