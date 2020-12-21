import { Container, Divider, Grid, Paper, Tooltip, Fab, Modal } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import AddIcon from '@material-ui/icons/Add'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import React, { useEffect, useState } from 'react'
import { showGame } from '../../api/games'

const GameShow = props => {
  const [game, setGame] = useState(null)
  const [open, setOpen] = useState(false)
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
      <Modal open={open} onClose={() => { setOpen(false) }}>

      </Modal>
      {game && (
        <div>
          <h3>Game Show</h3>
          <Container key={game.id}>
            <h2>{game.title}</h2>
            <p>{game.description}</p>
            <Grid container spacing={3} justify="space-between">
              {game.reviews.map(review => (
                <Grid key={review.id} item xs={12} md={6}>
                  <Paper elevation={10} style={{ padding: '20px' }}>
                    <MoreVertIcon style={{ float: 'right' }} onClick={() => { setOpen(true) }} />
                    <h4>{review.head}</h4>
                    <Rating readOnly={true} value={review.rating} precision={0.5} />
                    <Divider></Divider>
                    <p>{review.body}</p>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
          <Tooltip title="Add Review" aria-label="add review">
            <Fab color="secondary" href={`/#/review-create/${game.id}`} style={{
              position: 'absolute',
              bottom: '100px',
              right: '50px'
            }}>
              <AddIcon />
            </Fab>
          </Tooltip>
        </div>
      )}
    </div>
  )
}

export default GameShow
