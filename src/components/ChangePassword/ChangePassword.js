import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { changePassword } from '../../api/auth'

import { TextField, Button } from '@material-ui/core'
import messages from '../AutoDismissAlert/messages'

class ChangePassword extends Component {
  constructor () {
    super()

    this.state = {
      oldPassword: '',
      newPassword: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onChangePassword = event => {
    event.preventDefault()

    const { msgAlert, history, user } = this.props

    changePassword(this.state, user)
      .then(() => msgAlert({
        message: messages.changePasswordSuccess
      }))
      .then(() => history.push('/'))
      .catch(() => {
        this.setState({ oldPassword: '', newPassword: '' })
        msgAlert({
          message: messages.changePasswordFailure
        })
      })
  }

  render () {
    const { oldPassword, newPassword } = this.state

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Change Password</h3>
          <form onSubmit={this.onSignIn} style={{ textAlign: 'center' }}>
            <TextField
              label="Old Password"
              required
              style={{ margin: 20 }}
              type="password"
              name="oldPassword"
              value={oldPassword}
              placeholder="Old Password"
              fullWidth
              variant='outlined'
              onChange={this.handleChange}
            />
            <TextField
              label="New Password"
              required
              style={{ margin: 20 }}
              name="newPassword"
              value={newPassword}
              type="password"
              placeholder="New Password"
              fullWidth
              variant='outlined'
              onChange={this.handleChange}
            />
            <Button
              color='secondary'
              variant='contained'
              type='submit'
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(ChangePassword)
