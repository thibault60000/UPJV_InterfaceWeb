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
import ArticleCreateForm from "./ArticleCreateForm";

import {Parallax} from 'react-materialize';
import Bottom from "../Bottom";

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
    return (
      <div>
        <Navigation />
        <Parallax imageSrc="http://materializecss.com/images/parallax1.jpg"/>
        <h2 className="h2-title">Création d'une nouvelle idée</h2>
        <ArticleCreateForm
          authUser={this.props.authUser}
          history={this.state.history}
        />
        <Bottom />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

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
