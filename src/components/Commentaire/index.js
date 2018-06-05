import React, { Component } from "react";
import { connect } from "react-redux";
import { history } from "../../store";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";

// Firebase
import { db } from "../../firebase";

// HOC
import withAuthorization from "../Session/withAuthorization";

// Components
import CommentaireCreateForm from "./CommentaireCreateForm";
import CommentaireList from "./CommentaireList";

// Materialize
import {Row} from 'react-materialize';


class CommentairePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: history
    };
  }

  render() {
    const { authUser, articleId, authUserName, articleAuthor, article } = this.props;

    return (
      <div>
        { articleId  && <CommentaireList article={article} articleAuthor={articleAuthor} articleID={articleId} authUserName={authUserName} authUser={authUser} /> }
      </div>
    );
  }
}


export default CommentairePage;
