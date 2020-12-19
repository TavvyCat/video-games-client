import { AppBar, Tab, Tabs } from '@material-ui/core'
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset'
import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

const Header = ({ user, history }) => {
  const [value, setValue] = useState(history.location.pathname)
  // const allTabs = ['/', '/change-pw', '/sign-out', '/sign-up', '/sign-in']

  const handleChange = (event, value) => {
    setValue(value)
    history.push(value)
  }

  return (
    <AppBar position="static" >
      <Tabs
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        aria-label="nav tabs"
      >
        <Tab icon={<VideogameAssetIcon fontSize="large" />} value="/" />
        <Tab disabled/>
        <Tab label="Change Password" value="/change-pw" style={user ? { 'display': 'inline-flex' } : { 'display': 'none' }} />
        <Tab label="Sign Out" value="/sign-out" style={user ? { 'display': 'inline-flex' } : { 'display': 'none' }} />
        <Tab label="Sign Up" value="/sign-up" style={user ? { 'display': 'none' } : { 'display': 'inline-flex' }} />
        <Tab label="Sign In" value="/sign-in" style={user ? { 'display': 'none' } : { 'display': 'inline-flex' }} />
        {/* <LinkTab label="Change Password" href="#change-pw" {...a11yProps(0)} /> */}
      </Tabs>
    </AppBar>
  )
}

export default withRouter(Header)
