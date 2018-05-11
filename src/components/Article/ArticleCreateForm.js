import React, { Component } from "react";

// Firebase
import { db } from "../../firebase";
import firebase from "firebase";

// Routes
import * as routes from "../../constants/routes";

import { Input, Row, Col, Button, Dropdown, NavItem, Icon } from "react-materialize";

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
  limite: 50
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
      limite
    } = this.state;
    const { history, authUser } = this.props;
    const id = authUser.uid + Date.now();
    const date = Date.now();
    const comments = {};
    const likes = 0;
    const username = authUser.email;

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
        avatar
      )
      .then(() => {
        this.setState(() => ({
          ...INITIAL_STATE
        }));
        history.push(routes.ARTICLE);
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
      limite
    } = this.state;
    const isInvalid = title === "" || description === "" || keywords === "";

    return (
      <div className="container">
        {error && <p>{error.message}</p>}
        <form onSubmit={this.onSubmit}>
            <Row className="center-align">
              <Input
                type="text"
                value={title}
                s={12}
                m={6}
                l={6}
                label="Titre de l'article"
                onChange={event =>
                  this.setState(updateByPropertyName("title", event.target.value))
                }
              />
              <Input 
                s={12}
                m={6}
                l={6}
                type='select'
                label="Sélectionner un thème"
                defaultValue='1'
              >
                <option value='1'>Thème 1</option>
                <option value='2'>Thème 2</option>
                <option value='3'>Thème 3</option>
              </Input>
              <Input
                type="textarea"
                value={description}
                s={12}
                m={6}
                l={6}
                label="Description de l'article"
                onChange={event =>
                  this.setState(
                    updateByPropertyName("description", event.target.value)
                  )
                }
              />
              <Input
                type="textarea"
                value={keywords}
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
                type="range"
                s={12}
                m={12}
                l={12}
                min="5"
                max="100"
                step="5"
                label="Limite de participants"
                value={limite}
                onChange={event =>
                  this.setState(
                    updateByPropertyName("limite", event.target.value)
                  )
                }
              />
              <Input
                s={12}
                m={12}
                l={6}
                name="checkboxIsPublic"
                type="checkbox"
                value={isPublic}
                label="Public"
                onChange={event =>
                  this.setState(
                    updateByPropertyName("isPublic", event.target.value)
                  )
                }
              />
              <Button
                s={12}
                m={12}
                l={12}
                waves="light"
                disabled={isInvalid}
                type="submit">
                Créer
              </Button>              
            </Row>
        </form>
      </div>
    );
  }
}

export default ArticleCreateForm;
