import React from 'react';
import { connect } from 'react-redux';

import SignOutButton from '../SignOut';
import * as routes from '../../constants/routes';
import {Navbar, NavItem} from 'react-materialize'

import logoImg from "../../assets/images/ampoule.png";
const Navigation = ({ authUser }) =>
  <div>
    { authUser
        ? <NavigationAuth />
        : <NavigationNonAuth />
    }
  </div>

var Img = <img src={logoImg}/>

const NavigationAuth = () =>
  <Navbar brand={Img} right>
    <NavItem className="text-uppercase" href={routes.LANDING} >
      Accueil
    </NavItem>
    <NavItem className="text-uppercase" href={routes.MY_ARTICLES}>
      Mes idées
    </NavItem>
    <NavItem className="text-uppercase" href={routes.CONTACT}>
      Contact
    </NavItem>
    <NavItem className="text-uppercase" href={routes.A_PROPOS}>
      À propos
    </NavItem>
    <NavItem className="text-uppercase" href={routes.ACCOUNT}>
      Mon compte
    </NavItem>
    <SignOutButton />
  </Navbar>

const NavigationNonAuth = () =>
  <Navbar brand={Img} right>
    <NavItem className="text-uppercase" href={routes.LANDING} >
      Accueil
    </NavItem>
    <NavItem className="text-uppercase" href={routes.SIGN_UP} >
      Inscription
    </NavItem>
    <NavItem className="text-uppercase" href={routes.CONTACT}>
      Contact
    </NavItem>
    <NavItem className="text-uppercase" href={routes.A_PROPOS}>
      A propos
    </NavItem>
  </Navbar>

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Navigation);
