import React, { useEffect, useState } from 'react'
import { Container, Divider, Grid, Paper, Tooltip, Fab, Modal } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import AddIcon from '@material-ui/icons/Add'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import '../../index.scss'
import { showGame } from '../../api/games'
import ReviewOptions from '../Reviews/ReviewOptions'

const GameShow = props => {
  const [game, setGame] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [reviewId, setReviewId] = useState(null)
  const id = props.match.params.id

  useEffect(() => {
    showGame(id)
      .then(res => {
        setGame(res.data.game)
      })
      .catch(console.error)
  }, [])

  const openModal = (id) => {
    setReviewId(id)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <div>
      <Container>
        <Modal
          open={modalOpen}
          onClose={closeModal}
          closeAfterTransition
          className='modal-style'
        >
          <div>
            <ReviewOptions reviewId={reviewId} user={props.user} gameId={id} closeModal={closeModal}/>
          </div>
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
                      { props.user.id === review.owner && <MoreVertIcon style={{ float: 'right', cursor: 'pointer' }} onClick={() => openModal(review.id)} /> }
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
                position: 'fixed',
                bottom: '50px',
                right: '50px'
              }}>
                <AddIcon />
              </Fab>
            </Tooltip>
          </div>
        )}
      </Container>
    </div>
  )
}

export default GameShow
