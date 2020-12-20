import React, { useEffect, useState } from 'react'
import { Button, Card, Container, Grid } from '@material-ui/core'
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
    </Container>
  )
}

export default GamesIndex
