import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Row, Input, Button} from 'react-materialize'

import { auth } from '../../firebase';
import * as routes from '../../constants/routes';

const PasswordForgetPage = () =>
  <div>
    <h1>Mot de passe oublié ?</h1>
    <PasswordForgetForm />
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
        <Row>
          <h3 className="h3-title">Récupérer mon mot de passe</h3>
          <hr className="separator"/>
        </Row>
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

const PasswordForgetLink = () => <Link to={routes.PASSWORD_FORGET}>Mot de pass oublié ?</Link>

export default PasswordForgetPage;

export {
  PasswordForgetForm,
  PasswordForgetLink,
};
