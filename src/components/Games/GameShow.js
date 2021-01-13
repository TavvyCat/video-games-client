import React, { useEffect, useState } from 'react'
import { Container, Divider, Grid, Paper, Tooltip, Fab, Modal, Chip, Avatar } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import AddIcon from '@material-ui/icons/Add'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import '../../index.scss'
import { showGame } from '../../api/games'
import ReviewOptions from '../Reviews/ReviewOptions'
import { NavLink } from 'react-router-dom'
import { createTag, deleteTag } from '../../api/tags'
import messages from '../AutoDismissAlert/messages'

const GameShow = props => {
  const [game, setGame] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [reviewId, setReviewId] = useState(null)
  const [renderer, render] = useState(0)
  const { user, match, msgAlert } = props
  const id = match.params.id

  useEffect(() => {
    showGame(id)
      .then(res => {
        setGame(res.data.game)
      })
      .catch(console.error)
  }, [modalOpen, renderer])

  const openModal = (id) => {
    setReviewId(id)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const averageRating = (reviews) => {
    if (reviews.length === 0) {
      return 0
    } else {
      return Math.round((reviews.reduce((accumulator, currentElement) => {
        return accumulator + currentElement.rating
      }, 0) / reviews.length) * 2) / 2
    }
  }

  const tags = tags => {
    const tagsTally = tags.reduce((tally, current) => {
      tally[current.name] = (tally[current.name] || 0) + 1
      return tally
    }, {})
    console.log(tagsTally)
    return tagsTally
  }

  const handleTag = (tagName) => {
    const tag = game.tags.filter(tag => {
      if (tag.name === tagName && tag.owner === user.id) {
        return true
      } else return false
    })
    if (tag.length === 0) {
      createTag({ name: tagName, game_id: game.id }, user.token)
        .then(() => msgAlert({
          message: messages.tagCreateSuccess
        }))
        .then(() => render(Math.random()))
        .catch(() => msgAlert({
          message: messages.tagCreateFailure
        }))
    } else {
      deleteTag(tag[0].id, user.token)
        .then(() => msgAlert({
          message: messages.tagDeleteSuccess
        }))
        .then(() => render(Math.random()))
        .catch(() => msgAlert({
          message: messages.tagDeleteFailure
        }))
    }
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
            <ReviewOptions
              reviewId={reviewId}
              user={props.user}
              gameId={id}
              closeModal={closeModal}
              msgAlert={props.msgAlert}
            />
          </div>
        </Modal>
        {game && (
          <div>
            <Container key={game.id} className="text-center">
              <h2 className="mt-5 text-center">{game.title}</h2>
              <div className="my-4 text-center">
                {Object.entries(tags(game.tags)).map(([name, count]) => (
                  <Chip key={name} className="mx-1" label={name} avatar={<Avatar>{count}</Avatar>} onClick={() => handleTag(name)} />
                ))}
              </div>
              <h5>Overall Rating</h5>
              <Rating readOnly={true} value={averageRating(game.reviews)} precision={0.5} />
              <p className="my-5">{game.description}</p>
              <h4 style={{ textAlign: 'center', margin: '30px auto' }}>Reviews</h4>
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
            <NavLink to={`/review-create/${game.id}`}>
              <Tooltip title="Add Review" aria-label="add review">
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
          </div>
        )}
      </Container>
    </div>
  )
}

export default GameShow
