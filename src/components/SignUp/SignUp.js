import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signUp, signIn } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import { TextField, Button } from '@material-ui/core'

class SignUp extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignUp = event => {
    event.preventDefault()

    const { msgAlert, history, setUser } = this.props

    signUp(this.state)
      .then(() => signIn(this.state))
      .then(res => setUser(res.data.user))
      .then(() => msgAlert({
        heading: 'Sign Up Success',
        message: messages.signUpSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .catch(error => {
        this.setState({ email: '', password: '', passwordConfirmation: '' })
        msgAlert({
          heading: 'Sign Up Failed with error: ' + error.message,
          message: messages.signUpFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { email, password, passwordConfirmation } = this.state

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Sign Up</h3>
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
            <TextField
              label='Password Confirmation'
              required
              style={{ margin: 20 }}
              name="passwordConfirmation"
              value={passwordConfirmation}
              type="password"
              placeholder="Confirm Password"
              variant='outlined'
              fullWidth
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

export default withRouter(SignUp)
