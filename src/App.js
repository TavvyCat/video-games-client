import React, { Fragment, useState } from 'react'
import { Route } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'
import GamesIndex from './components/Games/GamesIndex'
import GameShow from './components/Games/GameShow'
import GameCreate from './components/Games/GameCreate'
import GameUpdate from './components/Games/GameUpdate'
import ReviewCreate from './components/Reviews/ReviewCreate'

const App = props => {
  const [msgAlerts, setMsgAlerts] = useState([])
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  console.log(cookies.user)

  const setUser = user => {
    setCookie('user', user)
  }

  const clearUser = () => {
    removeCookie('user')
  }

  const deleteAlert = (id) => {
    setMsgAlerts(prevState => {
      return prevState.filter(msg => msg.id !== id)
    })
  }

  const msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    setMsgAlerts(prevState => {
      return [...prevState, { heading, message, variant, id }]
    })
  }

  return (
    <Fragment>
      <Header user={cookies.user} />
      {msgAlerts.map((msgAlert, index) => (
        <AutoDismissAlert
          key={index}
          heading={msgAlert.heading}
          variant={msgAlert.variant}
          message={msgAlert.message}
          id={msgAlert.id}
          deleteAlert={deleteAlert}
        />
      ))}
      <main className="container">
        <Route path='/sign-up' render={() => (
          <SignUp msgAlert={msgAlert} setUser={setUser} />
        )} />
        <Route path='/sign-in' render={() => (
          <SignIn msgAlert={msgAlert} setUser={setUser} />
        )} />
        <AuthenticatedRoute user={cookies.user} path='/sign-out' render={() => (
          <SignOut msgAlert={msgAlert} clearUser={clearUser} user={cookies.user} />
        )} />
        <AuthenticatedRoute user={cookies.user} path='/change-pw' render={() => (
          <ChangePassword msgAlert={msgAlert} user={cookies.user} />
        )} />
        <AuthenticatedRoute user={cookies.user} path='/games' exact render={() => (
          <GamesIndex msgAlert={msgAlert} user={cookies.user} />
        )} />
        <AuthenticatedRoute user={cookies.user} path='/games/:id' render={(props) => (
          <GameShow msgAlert={msgAlert} user={cookies.user} match={props.match} />
        )} />
        <AuthenticatedRoute user={cookies.user} path='/game-create' render={() => (
          <GameCreate msgAlert={msgAlert} user={cookies.user} />
        )} />
        <AuthenticatedRoute user={cookies.user} path='/game-update/:id' render={(props) => (
          <GameUpdate msgAlert={msgAlert} user={cookies.user} match={props.match} />
        )} />
        <AuthenticatedRoute user={cookies.user} path='/review-create/:gameId' render={(props) => (
          <ReviewCreate msgAlert={msgAlert} user={cookies.user} match={props.match} />
        )} />
      </main>
    </Fragment>
  )
}

export default App
