import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../../firebase';
import * as routes from '../../constants/routes';


import Bottom from "../Bottom";
import Navigation from "../Navigation";

import oneArticle from '../../assets/images/oneArticle.jpg'

import {Container, Button, Row, Col, Input} from 'react-materialize'

const PasswordForgetPage = ({ authUser }) =>
  <div>
    <Navigation />
    <div className="parallax-container">
        <div className="center-align">
            <Row>
                <h1 className="title-parallax-connected-with-elements bold home-h1-title">Vous avez oublié votre mot de passe ?</h1>
            </Row>
        </div>
        <div className="center-align">
            <Row>
              <h2 className="title-parallax-connected-with-elements home-h2-title">Nous avons la solution !</h2>
            </Row>
        </div>
        <div className="parallax">
            <img src={oneArticle} />
        </div>
    </div>
    <Container>
      <Row className="m-5">
        <h3 className="h3-title">Renseignez votre adresse e-mail</h3>
      </Row>
      <Row className="m-5">
        <Col s={12} m={12} l={12}>
          <PasswordForgetForm />
        </Col>
        <Col s={12} m={12} l={12}>
          <p className="text text-left">* Vous recevrez un e-mail dans les 48 prochaines heures à la date où a été transmis cette demande.</p>
        </Col>
      </Row>
      
    </Container>
    <Bottom/>
  </div>

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;

    auth.doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      error,
    } = this.state;

    const isInvalid = email === '';

    return (
      <form onSubmit={this.onSubmit} autoComplete="on">
        { error && <p s={12} m={12} l={12} className="error">{error.message}</p> }
        <Row className="center-align">
            <Input
              s={12}
              m={12}
              l={10}
              label="Adresse e-mail"
              placeholder="example@test.com"
              value={this.state.email}
              onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
              type="email"
              autoComplete="on"
            />
            <Button 
              s={12}
              m={12}
              l={2}
              waves='light'
              disabled={isInvalid}
              type="submit"
            >
              Valider
            </Button>
        </Row>
      </form>
    );
  }
}

const PasswordForgetLink = () => <Link className="forgot-link modal-btn modal-close btn" to={routes.PASSWORD_FORGET}>Mot de passe oublié ?</Link>

export default PasswordForgetPage;

export {
  PasswordForgetForm,
  PasswordForgetLink,
};
