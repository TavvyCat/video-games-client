import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signIn } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import { Button, TextField } from '@material-ui/core'

class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignIn = event => {
    event.preventDefault()

    const { msgAlert, history, setUser } = this.props

    signIn(this.state)
      .then(res => {
        setUser(res.data.user)
        msgAlert({ message: `Welcome, ${res.data.user.username}!` })
      })
      .then(() => history.push('/games'))
      .catch(() => {
        msgAlert({ message: messages.signInFailure })
      })
  }

  render () {
    const { email, password } = this.state

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Sign In</h3>
          <form onSubmit={this.onSignIn} style={{ textAlign: 'center' }}>
            <TextField
              label="Email Address"
              required
              style={{ margin: 20 }}
              type="email"
              name="email"
              value={email}
              placeholder="Enter email"
              fullWidth
              variant='outlined'
              onChange={this.handleChange}
            />
            <TextField
              label="Password"
              required
              style={{ margin: 20 }}
              name="password"
              value={password}
              type="password"
              placeholder="Password"
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

export default withRouter(SignIn)
