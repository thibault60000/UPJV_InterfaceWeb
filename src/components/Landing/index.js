import React from 'react';
import Navigation from '../Navigation'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/fontawesome-free-solid'
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';

const LandingPage = () =>
    <section>
        <Navigation />  
        <hr />
        <h1> Bienvenue ! </h1>
    </section>

const LandingLink = () => <Link to={routes.LANDING} >  <FontAwesomeIcon icon={faAngleLeft} /> Accueil </Link>

export default LandingPage;

export { LandingLink };