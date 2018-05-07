import React, { Component } from "react";

// Firebase
import { db } from "../../firebase";

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
      error: null
    };
  }

  onSubmit = event => {
    const { title, description, id } = this.state;
    const { history } = this.props;
    const editDate = Date.now();

    db
      .updateArticle(
        id,
        title,
        description,
        editDate
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
    const { title, description, error, authUser } = this.state;
    const isInvalid = title === "" || description === "";

    return (
      <div>
        <h1>
          {" "}
          Editez votre article <strong> {authUser}</strong>
        </h1>

        <form onSubmit={this.onSubmit}>
          <label forhtml="titleArticle">Titre de l'article</label>
          <input
            value={title}
            placeholder={title}
            id="titleArticle"
            onChange={event =>
              this.setState(updateByPropertyName("title", event.target.value))
            }
            type="text"
            placeholder="Titre"
          />
          <label forhtml="descArticle">Description de l'article</label>
          <textarea
            id="descArticle"
            placeholder={description}
            value={description}
            onChange={event =>
              this.setState(
                updateByPropertyName("description", event.target.value)
              )
            }
            placeholder="Description"
          />

          <button disabled={isInvalid} type="submit">
            Modifier
          </button>

          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

export default OneArticleEditForm;
