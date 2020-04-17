// Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react'
import { Menu, Image } from 'semantic-ui-react'

import {
  isAdmin,
  isAuthenticated,
  isRegistered,
  logout,
  getLoginRedirectUrl
} from 'services/self'

import { cognitoDomain, cognitoClientId } from '../services/api'

// mobx
import { observer } from 'mobx-react'

// fragments
import { fragments } from 'services/get-fragments'

// components
import MenuLink from 'components/MenuLink'

function getCognitoUrl (type) {
  const redirectUri = getLoginRedirectUrl()
  return `${cognitoDomain}/${type}?response_type=token&client_id=${cognitoClientId}&redirect_uri=${redirectUri}`
}

export const NavBar = observer(
  class NavBar extends React.Component {
    render () {
      return <Menu inverted borderless attached style={{ flex: '0 0 auto' }} stackable>
        <MenuLink to='/'>
          <Image size='mini' src='/custom-content/nav-logo.png' style={{ paddingRight: '10px' }} />
          {fragments.Home.title}
        </MenuLink>

        <MenuLink to='/getting-started'>Get Started</MenuLink>
        <MenuLink to='/apis'>{fragments.APIs.title}</MenuLink>
        {isRegistered() && <MenuLink to='/learn-norm'>Our Normalization - Learn More</MenuLink>}

        <Menu.Menu position='right'>
          {isAuthenticated() ? <>
            {isAdmin() && <MenuLink to='/admin/apis'>Admin Panel</MenuLink>}
            {isRegistered() && <MenuLink to='/dashboard'>My Dashboard</MenuLink>}
            <MenuLink onClick={logout}>Sign Out</MenuLink>
          </> : <>
            <MenuLink to={getCognitoUrl('login')}>Sign In</MenuLink>
            <MenuLink to={getCognitoUrl('signup')}>Register</MenuLink>
          </>}
        </Menu.Menu>
      </Menu>
    }
  }
)

export default NavBar
