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
    /* Commentaires */
    const { onSetCommentaires, articleId } = this.props;
    db
      .onceGetCommentaireId("hZV4CJZcdLZwfmo4z3EDK4QVm5v21525989944682")
      .on("value", function(snapshot) {
        onSetCommentaires(snapshot.val());
      });
    /* Users */
    const { onSetUsers } = this.props;
    db.onceGetUsers().then(snapshot => onSetUsers(snapshot.val()));
  }

  render() {
    const { authUser, commentaires, users } = this.props;
    console.log(commentaires);

    return (
      <div>
        <h1> Les commentaires de cette idée : </h1>
        {Object.keys(commentaires)
          .sort()
          .reverse()
          .map(key => (
            <Row>
              <Col s={12}>
                <Chip>
                  <img src={avatarImg} alt="Contact Person" />
                  {users.hasOwnProperty(commentaires[key].user) && (
                    <strong>{users[commentaires[key].user].username} | </strong>
                  )}{" "}
                  <span> {commentaires[key].content}</span>
                </Chip>
              </Col>
            </Row>
          ))};
      </div>
    );
  }
}

const mapStateToProps = state => ({
  commentaires: state.commentaireState.commentaires,
  users: state.userState.users
});

const mapDispatchToProps = dispatch => ({
  onSetCommentaires: commentaires =>
    dispatch({ type: "COMMENTAIRES_SET", commentaires }),
  onSetUsers: users => dispatch({ type: "USERS_SET", users })
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentaireList);
