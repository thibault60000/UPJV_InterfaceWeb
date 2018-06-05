import React, { Component } from "react";

// Firebase
import { db } from "../../firebase";

import { Input, Button, Container, Row } from "react-materialize";

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value
});

class OneArticleEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.articles.title,
      description: this.props.articles.description,
      id: this.props.articles.id,
      authUser: this.props.authUser,
      error: null,
      keywords: this.props.articles.keywords,
      limite: this.props.articles.limite,
      theme: this.props.articles.theme,
      isPublic: this.props.articles.isPublic,
    };
  }

  onSubmit = event => {
    const { title, description, id, keywords, limite, isPublic, theme } = this.state;
    const { history } = this.props;
    const editDate = Date.now();

    db
      .updateArticle(
        id,
        title,
        description,
        editDate,
        keywords,
        limite,
        theme,
        isPublic
      )
      .catch(error => {
        this.setState(updateByPropertyName("error", error));
      });
  
    event.preventDefault();
    this.setState({ 
        title: "",
        description: ""
    });
    history.push(`/article/${id}`);
  };

  render() {
    const { title, description, error, authUser, keywords, limite, isPublic, theme } = this.state;
    const isInvalid = title === "" || description === "" || keywords === "";

    return (
      <Container>
        { error && <p s={12} m={12} l={12} className="error">{error.message}</p> }
        <form onSubmit={this.onSubmit}>
          <Row className="center-align">
            <Input
                type="text"
                s={12}
                m={12}
                l={12}
                defaultValue={title}
                label="Titre de l'idée"
                onChange={event =>
                  this.setState(updateByPropertyName("title", event.target.value))
                }
            />
            <Input
              s={12}
              m={12}
              l={12}
              label="Thème"
              type="select"
              value={theme}
              onChange={event =>
                this.setState(updateByPropertyName("theme", event.target.value))
              }
            >
              <option value="1">Informatique</option>
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
              type="text"
              s={12}
              m={12}
              l={12}
              defaultValue={description}
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
              m={12}
              l={12}
              label="Mots clés (séparés par des virgules)"
              onChange={event =>
                this.setState(
                  updateByPropertyName("keywords", event.target.value)
                )
              }
            />
            <Input
              s={12}
              m={12}
              l={12}
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
              name="checkboxIsPublic"
              type="checkbox"
              checked={ isPublic }
              defaultValue={isPublic}
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
                className="modal-close" waves="light" disabled={isInvalid} type="submit">
              Modifier
            </Button>
          </Row>
        </form>
      </Container>
    );
  }
}

export default OneArticleEditForm;
