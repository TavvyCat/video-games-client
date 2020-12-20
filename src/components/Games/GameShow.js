import { Paper } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { showGame } from '../../api/games'

const GameShow = props => {
  const [game, setGame] = useState(null)
  const id = props.match.params.id
  useEffect(() => {
    showGame(id)
      .then(res => {
        setGame(res.data.game)
      })
      .catch(console.error)
  }, [])

  return (
    <div>
      <h3>Game Show</h3>
      {game && (
        <Paper key={game.id}>
          <h2>{game.title}</h2>
          <p>{game.description}</p>
        </Paper>
      )}
    </div>
  )
}

export default GameShow
