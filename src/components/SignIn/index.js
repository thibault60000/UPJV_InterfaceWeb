import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';
import { LandingLink } from '../Landing';
/* 
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faFacebookF } from '@fortawesome/fontawesome-free-brands' */

import {Row, Col, Input, Button} from 'react-materialize'

const SignInPage = ({ history }) =>
    <section>
          <SignInForm history={history} />
    </section>

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <form onSubmit={this.onSubmit} autoComplete="on">
        { error && <p s={12} m={12} l={12} className="error">{error.message}</p> }
        <Row>
          <Input
            s={12}
            m={12}
            l={12}
            label="Identifiant"
            placeholder="example@test.com"
            value={email}
            onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
            type="email"
            autoComplete="on"
          />
        </Row>
        <Row>
          <Input
            s={12}
            m={12}
            l={12}
            label="Mot de passe"
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={event => this.setState(updateByPropertyName('password', event.target.value))}
            type="password"
            autoComplete="on"
          />
        </Row>

        <Row className="center-align">
          <Col s={6} m={6} l={6}>
            <Button waves='light' disabled={isInvalid} type="submit">
              Se connecter
            </Button>
          </Col>
          <Col s={6} m={6} l={6}>
            <PasswordForgetLink/>
          </Col>
        </Row>
      </form>
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};
