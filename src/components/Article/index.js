import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import { history } from "../../store";

// Firebase
import { db } from "../../firebase";

// HOC
import withAuthorization from "../Session/withAuthorization";

// Components
import Navigation from "../Navigation";
import ArticleList from "./ArticleList";
import ArticleCreateForm from "./ArticleCreateForm";

class ArticlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: history
    };
  }

  componentDidMount() {
    const { onSetArticles } = this.props;
    db.onceGetArticles().then(snapshot => onSetArticles(snapshot.val()));
  }
  render() {
    const { articles, authUser } = this.props;

    return (
      <div>
        <Navigation />
        <hr />
        <h1>Article</h1>
        <ArticleCreateForm
          authUser={this.props.authUser}
          history={this.state.history}
        />
        {!!articles && <ArticleList />}
        {!articles && <p>Dommage, il n'y a pas d'articles</p>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.articleState.articles,
  authUser: state.sessionState.authUser
});

const mapDispatchToProps = dispatch => ({
  onSetArticles: articles => dispatch({ type: "ARTICLES_SET", articles })
});

const authCondition = authUser => !!authUser;

const exportConfig = compose(
  withRouter,
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
);

export default exportConfig(ArticlePage);
