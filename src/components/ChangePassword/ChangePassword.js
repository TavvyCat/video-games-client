import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { changePassword } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import { TextField, Button } from '@material-ui/core'

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
        heading: 'Change Password Success',
        message: messages.changePasswordSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .catch(error => {
        this.setState({ oldPassword: '', newPassword: '' })
        msgAlert({
          heading: 'Change Password Failed with error: ' + error.message,
          message: messages.changePasswordFailure,
          variant: 'danger'
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
              type="email"
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
