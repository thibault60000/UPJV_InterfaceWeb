import React, { Component } from "react";

// Firebase
import { db } from "../../firebase";

// Routes
import * as routes from "../../constants/routes";

import { Input, Row, Button, Container } from "react-materialize";

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  user: "",
  id: "",
  title: "",
  date: "",
  description: "",
  comments: {},
  likes: null,
  error: null,
  user: "",
  isPublic: true,
  keywords: null,
  limite: 50,
  theme: "",
  comments: 0,
  actualLimite: 0
};

class ArticleCreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
      avatar: "",
      isUploading: "",
      progress: 0
    };
  }

  onSubmit = event => {
    const {
      title,
      description,
      avatar,
      isPublic,
      keywords,
      limite,
      theme
    } = this.state;
    const { history, authUser } = this.props;
    const id = Date.now() + authUser.uid;
    const date = Date.now();
    const likes = 0;
    const username = authUser.email;
    const comments = 0;
    const actualLimite = 0;

    // Création d'un utilisateur dans la base de données
    db
      .doCreateArticle(
        authUser.uid,
        id,
        title,
        date,
        description,
        comments,
        likes,
        username,
        isPublic,
        keywords,
        limite,
        theme,
        actualLimite
      )
      .then(() => {
        this.setState(() => ({
          ...INITIAL_STATE
        }));
        history.push(routes.LANDING);
      })
      .catch(error => {
        this.setState(updateByPropertyName("error", error));
      });

    event.preventDefault();
  };

  render() {
    const {
      title,
      description,
      error,
      isPublic,
      keywords,
      limite,
      theme
    } = this.state;
    const isInvalid =
      title === "" || description === "" || keywords === "" || theme === "";

    return (
      <Container>
      <h2 className="article-title h2-title text-left">
          Formulaire de création d'un projet
        </h2>
        <p> Faites bien attention de séprarer les mots clés par des virgules, cela permettra à votre idée d'être plus rapidement trouver</p>
        {error && (
          <p s={12} m={12} l={12} className="error">
            {error.message}
          </p>
        )}
        <form onSubmit={this.onSubmit}>
          <Row className="center-align">
            <Input
              type="text"
              value={title}
              s={12}
              m={12}
              l={12}
              label="Titre de l'idée"
              onChange={event =>
                this.setState(updateByPropertyName("title", event.target.value))
              }
            />
           
            <Input
              type="text"
              value={description}
              s={12}
              m={6}
              l={6}
              label="Description de l'idée"
              onChange={event =>
                this.setState(
                  updateByPropertyName("description", event.target.value)
                )
              }
            />
            <Input
              type="text"
              defaultValue={keywords}
              s={12}
              m={6}
              l={6}
              label="Mots clés (séparés par des virgules)"
              onChange={event =>
                this.setState(
                  updateByPropertyName("keywords", event.target.value)
                )
              }
            />
            <Input
              s={12}
              m={6}
              l={6}
              type="select"
              label="Sélectionner un thème"
              value={theme}
              onChange={event =>
                this.setState(updateByPropertyName("theme", event.target.value))
              }
            >
              <option value="">Choisissez</option>
              <option value="Informatique">Informatique</option>
              <option value="Immobilier">Immobilier</option>
              <option value="Social">Social</option>
              <option value="Cuisine">Cuisine</option>
              <option value="Evenementiel">Evenementiel</option>
              <option value="Architecture">Architecture</option>
              <option value="Social">Social</option>
              <option value="Numérique">Numérique</option>
              <option value="Environnement">Environnement</option>
              <option value="Littérature">Littérature</option>
              <option value="Associatif">Associatif</option>
            </Input>
            <Input
              s={12}
              m={6}
              l={6}
              type="number"
              label="Limite de participants"
              defaultValue={limite}
              onChange={event =>
                this.setState(
                  updateByPropertyName("limite", event.target.value)
                )
              }
            />
            <Input
              s={12}
              m={12}
              l={12}
              className="checkbox"
              name="checkboxIsPublic"
              type="checkbox"
              checked={isPublic}
              label="Rendre l'idée publique"
              onChange={event =>
                this.setState(
                  updateByPropertyName("isPublic", event.target.checked)
                )
              }
            />
          </Row>
          <Row className="center-align">
            <Button
              s={12}
              m={12}
              l={12}
              waves="light"
              disabled={isInvalid}
              type="submit"
            >
              Créer
            </Button>
          </Row>
        </form>
      </Container>
    );
  }
}

export default ArticleCreateForm;
