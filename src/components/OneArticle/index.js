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
import Bottom from "../Bottom";

import oneArticle from '../../assets/images/oneArticle.jpg'

import { Row } from 'react-materialize';


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
    const { articles, authUser } = this.props;

    return (
      <div>
        <Navigation />
        <div className="parallax-container">
            <div className="center-align">
                <Row>
                  <h1 className="home-h1-title oneArticle-h1 bold title-parallax-without-elements">{ articles.title }</h1>
                </Row>
            </div>
            <div className="parallax">
                <img src={oneArticle} />
            </div>
            <Row className="valign-wrapper center-align">
              <a className="return-btn" href={routes.LANDING}>◄ Retour</a>
            </Row>
        </div>
        {!!articles && <OneArticle articles={articles} authUser={this.props.authUser} history={this.state.history} />}
        {!articles && <p>Cet article n'existe plus.</p>}
        <Bottom/>
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
