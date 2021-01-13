import React, { useEffect, useState } from 'react'
import { Avatar, Button, Card, Chip, Container, Divider, Fab, Grid, Tooltip } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { indexGames } from '../../api/games'
import { NavLink } from 'react-router-dom'

const GamesIndex = props => {
  const [games, setGames] = useState(null)

  useEffect(() => {
    indexGames()
      .then(res => setGames(res.data.games))
      .catch(console.error)
  }, [])

  const tags = tags => {
    const tagsTally = tags.reduce((tally, current) => {
      tally[current.name] = (tally[current.name] || 0) + 1
      return tally
    }, {})
    console.log(tagsTally)
    return tagsTally
  }

  return (
    <Container>
      <h2 className="text-center my-5">Games</h2>
      <Grid container spacing={2} justify="space-around">
        {games && games.map(game => (
          <Grid item key={game.id} xs={12} md={6} lg={4}>
            <Card className="p-4" raised>
              <h3 className="text-center mb-3">{game.title}</h3>
              <Divider className="mb-4"/>
              <div className="mb-4 text-center">
                {Object.entries(tags(game.tags)).map(([name, count]) => (
                  <Chip key={name} className="mx-1" label={name} avatar={<Avatar>{count}</Avatar>}/>
                ))}
              </div>
              <NavLink to={`/games/${game.id}`}>
                <Button style={{ float: 'right' }} variant="outlined" color="secondary">See Details</Button>
              </NavLink>
              <p>${game.price.toFixed(2)}</p>
            </Card>
          </Grid>
        ))}
      </Grid>
      <NavLink to="/game-create">
        <Tooltip title="Add Game" aria-label="add new game">
          <Fab color="secondary" style={{
            position: 'fixed',
            bottom: '50px',
            left: '50%',
            marginLeft: '-28px'
          }}>
            <AddIcon />
          </Fab>
        </Tooltip>
      </NavLink>
    </Container>
  )
}

export default GamesIndex
