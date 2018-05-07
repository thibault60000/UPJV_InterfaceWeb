import React, { Component } from "react";

import { db } from "../../firebase";
import * as routes from "../../constants/routes";

import { connect } from "react-redux";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import withAuthorization from "../Session/withAuthorization";
import Navigation from "../Navigation";
import { history } from '../../store';

import OneArticle from './OneArticle';

class OneArticlePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      history: history
    }
  }
  
  componentDidMount() {
    const { onSetArticles } = this.props;
    let articleId = history.location.pathname;
    articleId = articleId.substring(9);
    db.onceGetOneArticle(articleId).then(snapshot => onSetArticles(snapshot.val()));
  }

  render() {
    const { articles} = this.props;

    return (
      <div>
        <Navigation />
        <h1> Voici l'article : { articles.title } </h1>
        {!!articles && <OneArticle articles={articles} authUser={this.props.authUser} history={this.state.history} />}
        {!articles && <p>Cet article n'existe plus.</p>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.articleState.articles,
  authUser: state.sessionState.authUser
});

const mapDispatchToProps = dispatch => ({
  onSetArticles: articles => dispatch({ type: "ARTICLES_SET", articles }),
});

const authCondition = authUser => !!authUser;

const exportConfig = compose(
  withRouter,
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps));

export default exportConfig(OneArticlePage);
