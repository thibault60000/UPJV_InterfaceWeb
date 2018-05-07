import React from 'react';
import { Link } from 'react-router-dom';
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
  <Navbar brand='logo' right>
    <NavItem>
      <Link to={routes.LANDING}>Accueil</Link>
    </NavItem>
    <NavItem>
      <Link to={routes.HOME}>Ma Page D'accueil</Link>
    </NavItem>
    <NavItem>
      <Link to={routes.ACCOUNT}>Mon Compte</Link>
    </NavItem>
    <NavItem>
      <Link to={routes.ARTICLE}>Mes articles</Link>
    </NavItem>
    <NavItem>
      <SignOutButton />
    </NavItem>
  </Navbar>

const NavigationNonAuth = () =>
    <Navbar brand='logo' right>
    <NavItem>
      <Link to={routes.LANDING}>Accueil</Link>
    </NavItem>
    <NavItem>
      <Link to={routes.SIGN_IN}>Se Connecter </Link>
    </NavItem>
  </Navbar>

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Navigation);
