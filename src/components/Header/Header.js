import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { AppBar, Tab, Tabs } from '@material-ui/core'
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset'

const Header = ({ user, history }) => {
  const [value, setValue] = useState('/')
  const [variant, setVariant] = useState('fullWidth')

  const handleChange = (event, value) => {
    setValue(value)
    history.push(value)
  }
  const onResize = () => {
    if (window.innerWidth <= 815) {
      setVariant('scrollable')
    } else setVariant('fullWidth')
  }
  window.addEventListener('resize', onResize)
  useEffect(() => {
    onResize()
  }, [])

  return (
    <AppBar position="static" >
      <Tabs
        variant={variant}
        scrollButtons="auto"
        value={value}
        onChange={handleChange}
        aria-label="nav tabs"
      >
        <Tab icon={<VideogameAssetIcon fontSize="large" />} value="/" />
        <Tab label="Games" value="/games" style={user ? { 'display': 'inline-flex' } : { 'display': 'none' }} />
        <Tab label="Change Password" value="/change-pw" style={user ? { 'display': 'inline-flex' } : { 'display': 'none' }} />
        <Tab label="Sign Out" value="/sign-out" style={user ? { 'display': 'inline-flex' } : { 'display': 'none' }} />
        <Tab label="Sign Up" value="/sign-up" style={user ? { 'display': 'none' } : { 'display': 'inline-flex' }} />
        <Tab label="Sign In" value="/sign-in" style={user ? { 'display': 'none' } : { 'display': 'inline-flex' }} />
      </Tabs>
    </AppBar>
  )
}

export default withRouter(Header)
