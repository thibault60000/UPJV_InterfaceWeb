import React, { Component } from "react";

import { db } from "../../firebase";
import * as routes from "../../constants/routes";

import { connect } from "react-redux";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import withAuthorization from "../Session/withAuthorization";
import Navigation from "../Navigation";
import { history } from '../../store';

class ArticlePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      history: history
    }
  }
  
  componentDidMount() {
    const { onSetArticles } = this.props;

    db.onceGetArticles().then(snapshot => onSetArticles(snapshot.val()));
  }

  render() {
    const { articles } = this.props;

    return (
      <div>
        <Navigation />
        <h1>Article</h1>
        <ArticleCreateForm authUser={this.props.authUser} history={this.state.history} />
        {!!articles && <ArticleList articles={articles} />}
        {!articles && <p>Dommage, il n'y a pas d'articles</p>}
      </div>
    );
  }
}

/* Liste d'articles */
const ArticleList = ({ articles }) => (
  <div>
    <h2>Liste des articles </h2>

    {Object.keys(articles).map(key => (
      <ul key={key}>
        <li>{articles[key].title}</li>
      </ul>
    ))}
  </div>
);

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
  error: null
};

/* Article Create Form */

class ArticleCreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { title, description } = this.state;

    const { history, authUser } = this.props;

    const id = authUser.uid + Date.now();
    const date = Date.now();
    const comments = {};
    const likes = 0;

    // Création d'un utilisateur dans la base de données
    db
      .doCreateArticle(
        authUser.uid,
        id,
        title,
        date,
        description,
        comments,
        likes
      )
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.ARTICLE);
      })
      .catch(error => {
        this.setState(updateByPropertyName("error", error));
      });

    event.preventDefault();
  };

  render() {
    const { title, description, error } = this.state;
    const isInvalid = title === "" || description === "";
    const authUser = this.state.user;

    return (     
        <form onSubmit={this.onSubmit}>
          <input
            value={title}
            onChange={event =>
              this.setState(updateByPropertyName("title", event.target.value))
            }
            type="text"
            placeholder="Titre"
          />
          <textarea
            value={description}
            onChange={event =>
              this.setState(
                updateByPropertyName("description", event.target.value)
              )
            }
            placeholder="Description"
          />

          <button disabled={isInvalid} type="submit">
            Valider
          </button>

          {error && <p>{error.message}</p>}
        </form>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.articleState.articles,
  authUser: state.sessionState.authUser
});

const mapDispatchToProps = dispatch => ({
  onSetUsers: users => dispatch({ type: "USERS_SET", users }),
  onSetArticles: articles => dispatch({ type: "ARTICLES_SET", articles })
});

const authCondition = authUser => !!authUser;

const exportConfig = compose(
  withRouter,
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps));

export default exportConfig(ArticlePage);
