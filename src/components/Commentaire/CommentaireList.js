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
import CommentaireCreateForm from "./CommentaireCreateForm";

// Materialize
import { Row, Col, Chip, Tag } from "react-materialize";

// Images
import avatarImg from "../../assets/images/avatar.png";

class CommentaireList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { onSetCommentaires, articleId } = this.props;
    db.onceGetCommentaireId(articleId).on("value", function(snapshot) { snapshot => onSetCommentaires(snapshot.val()) });
  }

  render() {
    const { authUser, commentaires } = this.props;
    console.log(commentaires);

    return (
        <Row>
          <Col s={12}>
            <Chip>
              <img src={avatarImg} alt="Contact Person" />
              <strong>Jane Doe</strong>
            </Chip>
            <Tag>tag</Tag>
          </Col>
        </Row>
    );
  }
}

const mapStateToProps = state => ({
    commentaires: state.commentaireState.commentaires
  });
  
  const mapDispatchToProps = dispatch => ({
    onSetCommentaires: commentaires => dispatch({ type: "COMMENTAIRES_SET", commentaires }),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(CommentaireList);
