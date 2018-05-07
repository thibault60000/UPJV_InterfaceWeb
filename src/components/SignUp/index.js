import React, { Component } from 'react';
import {
  Link,
  withRouter,
} from 'react-router-dom';

import { auth, db } from '../../firebase';
import * as routes from '../../constants/routes';

const SignUpPage = ({ history }) =>
  <div>
    <h1>Ecran d'inscription</h1>
    <SignUpForm history={history} />
  </div>

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
  statut: ''
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
      statut,
    } = this.state;

    const {
      history,
    } = this.props;

    // Création d'un utilisateur dans l'API de Firebase
    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {

        // Création d'un utilisateur dans la base de données
        db.doCreateUser(authUser.uid, username, email, statut)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            history.push(routes.HOME);
          })
          .catch(error => {
            this.setState(updateByPropertyName('error', error));
          });

      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
      statut
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      username === '' ||
      email === '' ||
      statut === '';

    return (
      <form onSubmit={this.onSubmit}>
        <label forHtml="username">Nom d'utilisateur</label>
        <input
          value={username}
          id="username"
          onChange={event => this.setState(updateByPropertyName('username', event.target.value))}
          type="text"
          placeholder="Identifiant"
        />
        <label forHtml="email">Adresse Mail</label>
        <input
          value={email}
          id="email"
          onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
          type="text"
          placeholder="Mail"
        />
        <label forHtml="passwordOne">Mot de passe</label>
        <input
          value={passwordOne}
          id="paswwordOne"
          onChange={event => this.setState(updateByPropertyName('passwordOne', event.target.value))}
          type="password"
          placeholder="********"
        />
        <label forHtml="passwordTwo">Confirmez mot de passe</label>
        <input
          value={passwordTwo}
          id="passwordTwo"
          onChange={event => this.setState(updateByPropertyName('passwordTwo', event.target.value))}
          type="password"
          placeholder="*********"
        />
        <label forHrml="Statut">Statut</label>
        <select value={statut} id="Statut" name="Statut" onChange={event => this.setState(updateByPropertyName('statut', event.target.value))}>     
          <option value="">Choisissez</option>
          <option value="Collègue">Collège</option>
          <option value="Lycée">Lycée</option>
          <option value="Licence">Licence</option>
          <option value="Master">Master</option>
          <option value="Doctorat">Doctorat</option>
          <option value="Pro">Pro</option>
          <option value="Asso">Association</option>
        </select>

        <button disabled={isInvalid} type="submit">
          S'inscrire
        </button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

const SignUpLink = () => <Link to={routes.SIGN_UP} className="otherRoute" >S'inscrire</Link>
  

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};