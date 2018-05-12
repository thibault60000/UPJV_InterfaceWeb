import React from 'react';
import { connect } from 'react-redux';

import SignOutButton from '../SignOut';
import * as routes from '../../constants/routes';
import {Navbar, NavItem} from 'react-materialize'

const Navigation = ({ authUser }) =>
  <div>
    { authUser
        ? <NavigationAuth />
        : <NavigationNonAuth />
    }
  </div>

const NavigationAuth = () =>
  <Navbar brand='Idea Book' right>
    <NavItem href={routes.HOME}>
      Accueil (log)
    </NavItem>
    <NavItem href={routes.LANDING} >
      Accueil (non log)
    </NavItem>
    <NavItem href={routes.CONTACT}>
      Contact
    </NavItem>
    <NavItem href={routes.A_PROPOS}>
      A propos
    </NavItem>
    <NavItem href={routes.ACCOUNT}>
      Mon compte
    </NavItem>
    <SignOutButton />
  </Navbar>

const NavigationNonAuth = () =>
  <Navbar brand='Idea Book' right>
    <NavItem href={routes.LANDING} >
      Accueil
    </NavItem>
    <NavItem href={routes.CONTACT}>
      Contact
    </NavItem>
    <NavItem href={routes.A_PROPOS}>
      A propos
    </NavItem>
  </Navbar>

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Navigation);
