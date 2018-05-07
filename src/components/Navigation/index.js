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
    <NavItem href={routes.LANDING} >
      Bienvenue
    </NavItem>
    <NavItem href={routes.HOME}>
      Accueil
    </NavItem>
    <NavItem href={routes.ACCOUNT}>
      Mon Compte
    </NavItem>

    <NavItem href={routes.ARTICLE}>
      Les articles
    </NavItem>
   
    <SignOutButton />
    
  </Navbar>

const NavigationNonAuth = () =>
    <Navbar brand='logo' right>
    <NavItem href={routes.LANDING} >
      Bienvenue
    </NavItem>
    <NavItem href={routes.SIGN_IN}>
      Se Connecter
    </NavItem>
  </Navbar>

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Navigation);
