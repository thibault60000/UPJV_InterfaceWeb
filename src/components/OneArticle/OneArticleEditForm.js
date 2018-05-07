import React, { Component } from "react";

// Firebase
import { db } from "../../firebase";

import { Input, Button, Col, Row } from "react-materialize";

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
      isPublic: this.props.articles.isPublic,
    };
  }

  onSubmit = event => {
    const { title, description, id, keywords, limite, isPublic } = this.state;
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
    const { title, description, error, authUser, keywords, limite, isPublic } = this.state;
    const isInvalid = title === "" || description === "" || keywords === "";

    return (
    
        

      <div className="container">
      <p> Editez votre idée <strong> {authUser}</strong>
        </p>
      <form onSubmit={this.onSubmit}>
        <fieldset>
          <Row>
            <Input
                type="text"
                value={title}
                s={12}
                label="Titre de l'article"
                onChange={event =>
                  this.setState(updateByPropertyName("title", event.target.value))
                }
              />
              <Input
                type="textarea"
                value={description}
                s={12}
                label="Description de l'article"
                onChange={event =>
                  this.setState(
                    updateByPropertyName("description", event.target.value)
                  )
                }
              />
              <Col s={12}>
                <label forhtml="rangeArticle">Nombre maximum de personnes</label>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  id="rangeArticle"
                  value={limite}
                  onChange={event =>
                    this.setState(
                      updateByPropertyName("limite", event.target.value)
                    )
                  }
                />
                <output
                  forhtml="rangeArticle"
                  value={limite}
                  name="rangeArticleOutput"
                >
                  {limite}
                </output>
              </Col>
              <Input
                type="textarea"
                value={keywords}
                s={12}
                label="Mots clés (séparés par des virgules)"
                onChange={event =>
                  this.setState(
                    updateByPropertyName("keywords", event.target.value)
                  )
                }
              />
              
              <Input
                s={12}
                name="checkboxIsPublic"
                type="checkbox"
                value={isPublic}
                label="Publique ?"
                onChange={event =>
                  this.setState(
                    updateByPropertyName("isPublic", event.target.value)
                  )
                }
              />

              <Button waves="light" disabled={isInvalid} type="submit">
                Créer
              </Button>

              {error && <p>{error.message}</p>}

            </Row>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default OneArticleEditForm;
