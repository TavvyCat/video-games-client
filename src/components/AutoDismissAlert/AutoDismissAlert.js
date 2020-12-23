import React from 'react'
import { Snackbar } from '@material-ui/core'

class AutoDismissAlert extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: true
    }
    this.timeout = null
  }

  componentDidMount () {
    this.timeout = setTimeout(() => {
      this.handleClose()
    }, 5000)
  }

  componentWillUnmount () {
    clearTimeout(this.timeout)
  }

  handleClose = () => this.setState({ open: false })

  render () {
    const { message, deleteAlert, id } = this.props

    // Delete this alert after the fade animation time (300 ms by default)
    if (!this.state.open) {
      setTimeout(() => {
        deleteAlert(id)
      }, 1000)
    }

    return (
      <Snackbar
        message={message}
        open={this.state.open}
        onClose={this.handleClose}
      >
      </Snackbar>
    )
  }
}

export default AutoDismissAlert
