import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SignOutButton from '../SignOut';
import * as routes from '../../constants/routes';

const Navigation = ({ authUser }) =>
  <nav className="navbar">
    { authUser
        ? <NavigationAuth />
        : <NavigationNonAuth />
    }
  </nav>

const NavigationAuth = () =>
  <ul>
    <li><Link to={routes.LANDING}>Accueil</Link></li>
    <li><Link to={routes.HOME}>Ma Page D'accueil</Link></li>
    <li><Link to={routes.ACCOUNT}>Mon Compte</Link></li>
    <li><Link to={routes.ARTICLE}>Mes articles</Link></li>
    <li><SignOutButton /></li>
  </ul>

const NavigationNonAuth = () =>
  <ul>
    <li><Link to={routes.LANDING}>Accueil</Link></li>
    <li><Link to={routes.SIGN_IN}>Se Connecter </Link></li>
  </ul>

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Navigation);
