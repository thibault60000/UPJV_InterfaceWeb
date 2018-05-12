import React, { Component } from "react";
import { connect } from "react-redux";
import { history } from "../../store";

// HOC
import withAuthorization from "../Session/withAuthorization";

// Components
import CommentaireCreateForm from "./CommentaireCreateForm";
import CommentaireList from "./CommentaireList";

// Materialize
import {Row} from 'react-materialize';

// Images
import image3 from '../../assets/images/background3.jpg';


class CommentairePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: history
    };
  }

  render() {
    const { authUser, articleId } = this.props;

    return (
      <div>
        { articleId  && <CommentaireList articleID={articleId} authUser={authUser} /> }
        <CommentaireCreateForm articleID={articleId} authUser={authUser} history={history} />
      </div>
    );
  }
}


const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});


export default connect(mapStateToProps, null)(CommentairePage);
