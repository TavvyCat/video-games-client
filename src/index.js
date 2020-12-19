import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import './index.scss'

import App from './App'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#505050'
    },
    secondary: {
      main: '#ef6c00'
    }
  }
})

const appJsx = (
  <HashRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </HashRouter>
)

ReactDOM.render(appJsx, document.getElementById('root'))
