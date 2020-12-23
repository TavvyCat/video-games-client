import React, { useEffect, useState } from 'react'
import { Button, Card, Container, Fab, Grid, Tooltip } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { indexGames } from '../../api/games'

const GamesIndex = props => {
  const [games, setGames] = useState(null)

  useEffect(() => {
    indexGames()
      .then(res => setGames(res.data.games))
      .catch(console.error)
  }, [])

  return (
    <Container>
      <h2 className="text-center">Games</h2>
      <Grid container spacing={2} justify="space-around">
        {games && games.map(game => (
          <Grid item key={game.id} xs={12} md={6} lg={4}>
            <Card>
              <h3>{game.title}</h3>
              <p>${game.price}</p>
              <Button color="secondary" href={`/#/games/${game.id}`}>See Details</Button>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Tooltip title="Add" aria-label="add">
        <Fab color="secondary" href="/#/game-create" style={{
          position: 'fixed',
          bottom: '100px',
          right: '50px'
        }}>
          <AddIcon />
        </Fab>
      </Tooltip>
    </Container>
  )
}

export default GamesIndex
