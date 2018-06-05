import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import { history } from "../../store";
import * as moment from "moment";
import "moment/locale/fr";

// Firebase
import { db } from "../../firebase";

// HOC
import withAuthorization from "../Session/withAuthorization";

// Components
import CommentaireCreateForm from "./CommentaireCreateForm";

// Materialize
import {
  CardPanel,
  Row,
  Col,
  Chip,
  Tag,
  Button,
  Icon
} from "react-materialize";

// Images
import avatarImg from "../../assets/images/avatar.png";

class CommentaireList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    /* Commentaires */
    const { onSetCommentaires, articleID } = this.props;
    if (articleID) {
      db.onceGetCommentaireId(articleID).on("value", function(snapshot) {
        onSetCommentaires(snapshot.val());
      });
    }
    /* Users */
    const { onSetUsers } = this.props;
    db.onceGetUsers().then(snapshot => onSetUsers(snapshot.val()));
  }

  handleClickDeleteCom(commentaire, article){
    console.log(article);
    // Décrémenter le compteur
    db.decrementeArticleCommentaire(article.id, article.comments - 1);
    // Supprimer le commentaire de la bdd
    db.removeCommentaire(commentaire.id);
  }

  render() {
    const {
      authUser,
      commentaires,
      users,
      authUserName,
      articleAuthor,
      article
    } = this.props;

    moment.locale("fr");

    return (
      <Col s={12} m={6} l={6}>
        {commentaires != null && <h3> Messages </h3>}
        {commentaires === null && <h3> Aucun message </h3>}

        {/* BOUCLE SUR TOUS LES COMMENTAIRES */}
        {commentaires != null &&
          Object.keys(commentaires)
            .sort()
            .reverse()
            .map(key => (
              <CardPanel className="valign-wrapper" key={key}>
                {/* SI L'AUTHEUR DU COMMENTAIRE EST L'AUTEUR DE L'ARTICLE */}
                {users.hasOwnProperty(commentaires[key].user) &&
                  (commentaires[key].user === articleAuthor && (
                    <div className="authUserCom">
                      {console.log(articleAuthor, authUser.uid)}
                      {articleAuthor === authUser.uid && (
                        <Button
                          className="btn deleteCom"
                          waves="light"
                          onClick={() => {
                            this.handleClickDeleteCom(commentaires[key], article);
                          }}
                        >
                          {" "}
                          <Icon left>delete_forever</Icon>
                        </Button>
                      )}

                      <Col s={2} m={2} l={2}>
                        <img
                          src={avatarImg}
                          alt=""
                          className="circle responsive-img"
                        />
                      </Col>
                      <Col s={10} m={10} l={10}>
                        {users.hasOwnProperty(commentaires[key].user) && (
                          <p className="black-text bold commentaire-author">
                            {" "}
                            Auteur du projet
                          </p>
                        )}
                        <p className="commentaire-date">
                          {moment(commentaires[key].date)
                            .format("LLLL")
                            .toUpperCase()}
                        </p>
                        <p className="black-text italic justify commentaire">
                          {commentaires[key].content}
                        </p>
                      </Col>
                    </div>
                  ))}

                {/* SI L'AUTHEUR DU COMMENTAIRE N'EST PAS L'AUTEUR DE L'ARTICLE */}
                {users.hasOwnProperty(commentaires[key].user) &&
                  (commentaires[key].user !== articleAuthor && (
                    <div className="anonymeUserCom">
                      {articleAuthor === authUser.uid && (
                        <Button
                          className="btn deleteCom"
                          waves="light"
                          onClick={() => {
                            this.handleClickDeleteCom(commentaires[key], article);
                          }}
                        >
                          {" "}
                          <Icon left>warning</Icon>
                        </Button>
                      )}

                      <Col s={2} m={2} l={2}>
                        <img
                          src={avatarImg}
                          alt=""
                          className="circle responsive-img"
                        />
                      </Col>
                      <Col s={10} m={10} l={10}>
                        {users.hasOwnProperty(commentaires[key].user) && (
                          <p className="black-text bold commentaire-author">
                            {users[commentaires[key].user].name +
                              " " +
                              users[commentaires[key].user].lastname}
                          </p>
                        )}
                        <p className="commentaire-date">
                          {moment(commentaires[key].date)
                            .format("LLLL")
                            .toUpperCase()}
                        </p>
                        <p className="black-text italic justify commentaire">
                          {commentaires[key].content}
                        </p>
                      </Col>
                    </div>
                  ))}
              </CardPanel>
            ))}
      </Col>
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
