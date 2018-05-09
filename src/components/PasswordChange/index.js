import React, { Component } from 'react';
import {Row, Input, Button} from 'react-materialize'

import { auth } from '../../firebase';

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { passwordOne } = this.state;

    auth.doPasswordUpdate(passwordOne)
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
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '';

    return (
        <form onSubmit={this.onSubmit} autoComplete="on">
          <Row>
            <h3 className="h3-title">Changer de mot de passe</h3>
            <hr className="separator"/>
          </Row>
          { error && <p s={12} m={12} l={12} className="error">{error.message}</p> }
          <Row className="center-align">
            <Input
              s={12}
              m={6}
              l={5}
              label="Nouveau mot de passe"
              placeholder="Tapez votre nouveau mot de passe ici"
              onChange={event => this.setState(updateByPropertyName('passwordOne', event.target.value))}
              type="password"
              autoComplete="on"
            />
            <Input 
              s={12}
              m={6}
              l={5}
              label="Confirmez le mot de passe"
              placeholder="Confirmez votre nouveau mot de passe ici"
              id="passwordTwo"
              onChange={event => this.setState(updateByPropertyName('passwordTwo', event.target.value))}
              type="password"
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

export default PasswordChangeForm;