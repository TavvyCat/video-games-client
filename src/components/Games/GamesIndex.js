import React, { useEffect, useState } from 'react'
import { Avatar, Button, Card, Chip, Divider, Fab, Grid, Tooltip } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import SearchBar from 'material-ui-search-bar'
import { indexGames } from '../../api/games'
import { NavLink } from 'react-router-dom'

const GamesIndex = props => {
  const [games, setGames] = useState(null)
  const [search, setSearch] = useState('')

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
    return tagsTally
  }

  const handleChange = (e) => {
    setSearch(e)
    if (e === '') {
      indexGames()
        .then(res => setGames(res.data.games))
        .catch(console.error)
    }
  }

  const handleCancel = () => {
    indexGames()
      .then(res => setGames(res.data.games))
      .catch(console.error)
  }

  const handleSearch = () => {
    const filteredGames = games.filter(game => (
      game.title.toUpperCase().includes(search.toUpperCase()) ||
      game.tags.some(tag => (
        tag.owner === props.user.id && tag.name.toUpperCase().includes(search.toUpperCase())))
    ))
    setGames(filteredGames)
  }

  return (
    <Grid container justify="center" >
      <Grid item xs={12}>
        <h2 className="text-center my-5">Games</h2>
      </Grid>
      <SearchBar
        placeholder="Search by name of game or tag" className="mb-5 w-50" onCancelSearch={handleCancel}
        value={search} onChange={handleChange} onRequestSearch={handleSearch} />
      <Grid container spacing={2} justify="space-around">
        {games && games.map(game => (
          <Grid item key={game.id} xs={12} md={6} lg={4}>
            <Card className="p-4" raised>
              <h3 className="text-center mb-3">{game.title}</h3>
              <Divider className="mb-4"/>
              <div className="mb-4 text-center">
                {game.tags && Object.entries(tags(game.tags)).map(([name, count]) => (
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
    </Grid>
  )
}

export default GamesIndex
