import React from 'react';
import Navigation from '../Navigation';
import SignInForm from '../SignIn';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/fontawesome-free-solid'
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';

import {Parallax, Button, Modal, Icon, Row, Col} from 'react-materialize'

const LandingPage = () =>
    <section>
        <Navigation />
        <div className="parallax-container">
            <p className="white-text right-align header">
                lobortis feugiat vivamus
            </p>
            <div className="valign-wrapper center-align">
                <Row>
                    <h1 className="home-h1-title">Bienvenue</h1>
                </Row>
            </div>
            <div className="valign-wrapper center-align">
                <Row>
                    <h2 className="home-h2-title">Sur notre site de partage d'idées</h2>
                </Row>
            </div>
            <div className="valign-wrapper center-align">
                <Row>
                    <Modal
                        header='Connexion'
                        trigger={<Button waves='light'>Se connecter</Button>}>
                        <SignInForm/>
                    </Modal>
                </Row>
            </div>
            
                <div className="parallax">
                    <img src="http://materializecss.com/images/parallax1.jpg"/>
                </div>
        </div>
        <section id="home-section">
            <Row className="center-align">
                <Col s="12" m="4" l="4">
                    <Icon className="h2-icon home-icon">chat_bubble</Icon>
                    <h2 className="h2-title home-title">Discussion</h2>
                    <p className="text">
                        Elit voluptate deserunt ut dolore incididunt occaecat nostrud ea consequat sint eu.
                    </p>
                </Col>
                <Col s="12" m="4" l="4">
                    <Icon className="h2-icon home-icon">group</Icon>
                    <h2 className="h2-title home-title">Avis / Conseils</h2>
                    <p className="text">
                        Elit voluptate deserunt ut dolore incididunt occaecat nostrud ea consequat sint eu.
                    </p>
                </Col>
                <Col s="12" m="4" l="4">
                    <Icon className="h2-icon home-icon">flag</Icon>
                    <h2 className="h2-title home-title">Loisirs</h2>
                    <p className="text">
                        Elit voluptate deserunt ut dolore incididunt occaecat nostrud ea consequat sint eu.
                    </p>
                </Col>
            </Row>
        </section>
        <Parallax imageSrc="http://materializecss.com/images/parallax2.jpg"/>
        <p> Ceci est la page "LANDING" (dispo pour les utilisateurs non authentifiés et authentifiés)</p>
    </section>

const LandingLink = () => <Link to={routes.LANDING} >  <FontAwesomeIcon icon={faAngleLeft} /> Accueil </Link>

export default LandingPage;

export { LandingLink };