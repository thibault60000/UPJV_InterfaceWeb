import React, { Component } from "react";

// Firebase
import { db } from "../../firebase";
import firebase from "firebase";

// Routes
import * as routes from "../../constants/routes";

import {
  Input,
  Row,
  Col,
  Button,
  Dropdown,
  NavItem,
  Icon,
  Container
} from "react-materialize";

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  user: "",
  id: "",
  date: "",
  content: "",
  error: null
};

class CommentaireCreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE
    };
  }

  onSubmit = event => {
    const { content } = this.state;

    const { history, authUser, articleID, article } = this.props;

    const id = Date.now() + "comments" + articleID;
    const date = Date.now();
    const username = authUser.email;
    const newComments = article.comments + 1;
    // Création d'un utilisateur dans la base de données
    db
      .doCreateCommentaire(authUser.uid, id, date, content, username, articleID)
      .then(() => {
        this.setState(() => ({
          ...INITIAL_STATE
        }));
        db.updateArticleComments(articleID, newComments).then(() => {
          this.setState(() => ({
            ...INITIAL_STATE
          }));
        });

        history.push(routes.ARTICLE + "/" + articleID);
      })
      .catch(error => {
        this.setState(updateByPropertyName("error", error));
      });

    event.preventDefault();
  };

  render() {
    const { content, error } = this.state;
    const isInvalid = content === "";

    return (
      <Container>
        {error && (
          <p s={12} m={12} l={12} className="error">
            {error.message}
          </p>
        )}
        <form onSubmit={this.onSubmit}>
          <Row className="center-align">
            <Input
              type="text"
              value={content}
              s={12}
              m={12}
              l={12}
              label="Message"
              onChange={event =>
                this.setState(
                  updateByPropertyName("content", event.target.value)
                )
              }
            />
            <Button
              s={12}
              m={12}
              l={12}
              waves="light"
              disabled={isInvalid}
              className="modal-close"
              type="submit"
            >
              Commenter
            </Button>
          </Row>
        </form>
      </Container>
    );
  }
}

export default CommentaireCreateForm;
