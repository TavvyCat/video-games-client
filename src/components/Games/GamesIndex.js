import React, { useEffect, useState } from 'react'
import { Button, Card, Container, Divider, Fab, Grid, Tooltip } from '@material-ui/core'
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
      <h2 className="text-center my-5">Games</h2>
      <Grid container spacing={2} justify="space-around">
        {games && games.map(game => (
          <Grid item key={game.id} xs={12} md={6} lg={4}>
            <Card className="p-4" raised>
              <h3>{game.title}</h3>
              <Divider />
              <p>${game.price.toFixed(2)}</p>
              <Button style={{ float: 'right' }} variant="outlined" color="secondary" href={`/#/games/${game.id}`}>See Details</Button>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Tooltip title="Add Game" aria-label="add new game">
        <Fab color="secondary" href="/#/game-create" style={{
          position: 'fixed',
          bottom: '50px',
          left: '50%',
          marginLeft: '-28px'
        }}>
          <AddIcon />
        </Fab>
      </Tooltip>
    </Container>
  )
}

export default GamesIndex
