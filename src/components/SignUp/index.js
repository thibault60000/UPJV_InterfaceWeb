import React, { Component } from 'react';
import {
  Link,
  withRouter,
} from 'react-router-dom';

import { auth, db } from '../../firebase';
import * as routes from '../../constants/routes';

import Navigation from "../Navigation";
import Bottom from "../Bottom";

import image3 from '../../assets/images/background3.jpg';

import { Container, Button, Input, Row } from 'react-materialize';

const SignUpPage = ({ history }) =>
  <div>
    <Navigation />
    <div className="parallax-container">
      <div className="valign-wrapper center-align">
          <Row>
              <h2 className="home-h2-title title-parallax-without-elements">Inscription</h2>
          </Row>
      </div>
      <div className="parallax">
        <img src={image3}/>
      </div>
    </div>
    <Container>
      <Row className="m-5">
        <SignUpForm history={history} />
      </Row>
    </Container>
    <Bottom />
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
            history.push(routes.LANDING);
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
      <Container>
        <Row className="center-align">
          { error && <p s={12} m={12} l={12} className="error">{error.message}</p> }
          <form onSubmit={this.onSubmit}>
            <Input
              s={12}
              m={6}
              l={6}
              label="Nom d'utilisateur"
              placeholder="Veuillez saisir votre identifiant"
              id="username"
              onChange={event => this.setState(updateByPropertyName('username', event.target.value))}
              type="text"
            />
            <Input
              s={12}
              m={6}
              l={6}
              label="Adresse e-mail"
              placeholder="Veuillez saisir votre adresse e-mail"
              id="email"
              onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
              type="email"
            />
            <Input
              s={12}
              m={6}
              l={6}
              label="Mot de passe"
              placeholder="Veuillez saisir votre mot de passe"
              id="paswwordOne"
              onChange={event => this.setState(updateByPropertyName('passwordOne', event.target.value))}
              type="password"
            />
            <Input
              s={12}
              m={6}
              l={6}
              label="Confirmez votre mot de passe"
              placeholder="Veuillez à nouveau saisir votre mot de passe"
              id="passwordTwo"
              onChange={event => this.setState(updateByPropertyName('passwordTwo', event.target.value))}
              type="password"
            />
            <Input 
              s={12}
              m={12}
              l={12}
              id='statut'
              type='select'
              label="Statut"
              defaultValue=''
              onChange={ event => this.setState(updateByPropertyName('statut', event.target.value)) }>
              <option value=''>Choisissez</option>
              <option value="college">Collège</option>
              <option value="lycee">Lycée</option>
              <option value="licence">Licence</option>
              <option value="master">Master</option>
              <option value="doctorat">Doctorat</option>
              <option value="professionnel">Professionnel</option>
              <option value="association">Association</option>
            </Input>

            <Button
              s={12}
              m={12}
              l={12}
              disabled={isInvalid}
              type="submit">
              S'inscrire
            </Button>
          </form>
        </Row>
      </Container>
    );
  }
}

const SignUpLink = () => <Link to={routes.SIGN_UP} className="otherRoute" >S'inscrire</Link>
  

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};