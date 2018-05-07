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

const SignInPage = ({ history }) =>
    <section>
          <LandingLink />
          <h1>Ecran de connexion</h1>
          <SignUpLink />
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
        <label htmlFor="email">Identifiant</label>
        <input
          value={email}
          onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
          type="text"
          id="email"
          placeholder="Adresse-Mail"
          autoComplete="on"
        />
        <label htmlFor="password">Mot de passe</label>
        <input
          value={password}
          onChange={event => this.setState(updateByPropertyName('password', event.target.value))}
          type="password"
          id="password"
          placeholder="**********"
          autoComplete="on"
        />

        <PasswordForgetLink></PasswordForgetLink>

        <button disabled={isInvalid} type="submit">
          Rejoindre
        </button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};
