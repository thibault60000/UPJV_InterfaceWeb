import React, { Component } from "react";

// FIREBASE
import { auth, db } from "../../firebase";

// ROUTING
import * as routes from "../../constants/routes";
import { Link, withRouter } from "react-router-dom";

// Composants 
import Navigation from "../Navigation";
import Bottom from "../Bottom";
import signUp from '../../assets/images/signUp.jpg';

// Materialize 
import { Container, Button, Input, Row } from "react-materialize";

const SignUpPage = ({ history, authUser }) => (
  <div>
    <Navigation />
    <div className="parallax-container">
      
      <div className="valign-wrapper center-align">
        <Row>
          <h1 className="home-h1-title bold title-parallax-without-elements">
            Inscription
          </h1>
        </Row>
      </div>
      <div className="parallax">
        <img src={signUp} />
      </div>
    </div>
    <Container>
      <Row className="m-5">
        <SignUpForm history={history} />
      </Row>
    </Container>
    <Bottom />
  </div>
);

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  username: "",
  email: "",
  name: "",
  lastname: "",
  passwordOne: "",
  passwordTwo: "",
  error: null,
  statut: ""
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, name, lastname, passwordOne, statut } = this.state;

    const { history } = this.props;

    // Création d'un utilisateur dans l'API de Firebase
    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Création d'un utilisateur dans la base de données
        db
          .doCreateUser(authUser.uid, username, email, statut, name, lastname)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            history.push(routes.LANDING);
          })
          .catch(error => {
            this.setState(updateByPropertyName("error", error));
          });
      })
      .catch(error => {
        this.setState(updateByPropertyName("error", error));
      });

    event.preventDefault();
  };

  render() {
    const {
      username,
      email,
      name,
      lastname,
      passwordOne,
      passwordTwo,
      error,
      statut
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      username === "" ||
      email === "" ||
      name === "" ||
      lastname === "" ||
      statut === "";

    return (
      <Container>
        <h2 className="article-title h2-title text-left">
          Formulaire de création de compte
        </h2>

        <p> Votre email vous sera demandé lors de l'authentification. Votre Identifiant permettra de vous reconnaitre sur un projet</p>

        <Row className="center-align">
          {error && (
            <p s={12} m={12} l={12} className="error">
              {error.message}
            </p>
          )}
          <form onSubmit={this.onSubmit}>
            <Input
              s={12}
              m={6}
              l={6}
              label="Nom"
              id="lastname"
              onChange={event =>
                this.setState(updateByPropertyName("name", event.target.value))
              }
              type="text"
            />
            <Input
              s={12}
              m={6}
              l={6}
              label="Prénom"
              id="name"
              onChange={event =>
                this.setState(
                  updateByPropertyName("lastname", event.target.value)
                )
              }
              type="text"
            />
            <Input
              s={12}
              m={6}
              l={6}
              label="Identifiant"
              id="username"
              onChange={event =>
                this.setState(
                  updateByPropertyName("username", event.target.value)
                )
              }
              type="text"
            />
            <Input
              s={12}
              m={6}
              l={6}
              label="Adresse e-mail"
              id="email"
              onChange={event =>
                this.setState(updateByPropertyName("email", event.target.value))
              }
              type="email"
            />
            <Input
              s={12}
              m={6}
              l={6}
              label="Mot de passe"
              id="paswwordOne"
              onChange={event =>
                this.setState(
                  updateByPropertyName("passwordOne", event.target.value)
                )
              }
              type="password"
            />
            <Input
              s={12}
              m={6}
              l={6}
              label="Confirmez votre mot de passe"
              id="passwordTwo"
              onChange={event =>
                this.setState(
                  updateByPropertyName("passwordTwo", event.target.value)
                )
              }
              type="password"
            />
            <Input
              s={12}
              m={12}
              l={12}
              id="statut"
              type="select"
              label="Statut"
              defaultValue=""
              onChange={event =>
                this.setState(
                  updateByPropertyName("statut", event.target.value)
                )
              }
            >
              <option value="">Choisissez</option>
              <option value="college">Collège</option>
              <option value="lycee">Lycée</option>
              <option value="licence">Licence</option>
              <option value="master">Master</option>
              <option value="doctorat">Doctorat</option>
              <option value="professionnel">Professionnel</option>
              <option value="association">Association</option>
            </Input>

            <Button s={12} m={12} l={12} disabled={isInvalid} type="submit">
              S'inscrire
            </Button>
          </form>
        </Row>
      </Container>
    );
  }
}

const SignUpLink = () => (
  <Link to={routes.SIGN_UP} className="modal-btn modal-close btn" waves="light">
    S'inscrire
  </Link>
);

export default withRouter(SignUpPage);

export { SignUpForm, SignUpLink };
