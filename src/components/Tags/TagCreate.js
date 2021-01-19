import React, { useState } from 'react'
import { Paper, Grid, TextField, Button } from '@material-ui/core'
// import { createTag } from '../../api/tags'
// import messages from '../AutoDismissAlert/messages'

const TagCreate = props => {
  const [tagName, setTagName] = useState('')

  const handleSubmit = e => {
    e.preventDefault()

    props.handleTag(tagName, true)

    // createTag({ name: tagName, game_id: props.gameId }, props.user.token)
    //   .then(() => props.msgAlert({
    //     message: messages.tagCreateSuccess
    //   }))
    //   .then(props.closeModal())
    //   .catch(() => props.msgAlert({
    //     message: messages.tagCreateFailure
    //   }))
  }

  const handleChange = e => {
    setTagName(e.target.value)
  }

  return (
    <Paper>
      <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
        <Grid container justify="center">
          <Grid item xs={12}>
            <h4 style={{ marginTop: 10 }}>Add New Tag</h4>
          </Grid>
          <Grid item xs={10}>
            <TextField
              name="name"
              label="Name"
              type="text"
              variant="outlined"
              placeholder="Tag Name"
              value={tagName}
              required
              fullWidth
              style={{ margin: 10 }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="secondary" className="mb-4">Add Tag</Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  )
}

export default TagCreate
