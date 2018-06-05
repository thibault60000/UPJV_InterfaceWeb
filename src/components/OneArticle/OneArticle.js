import React, { Component } from "react";

// Redux and Routes
import * as routes from "../../constants/routes";
import { connect } from "react-redux";
import { history } from "../../store";

// Firebase
import { db } from "../../firebase";

// Moment.JS
import * as moment from "moment";
import "moment/locale/fr";

// Pages
import OneArticleEditForm from "./OneArticleEditForm";
import CommentairePage from "../Commentaire/index";
import CommentaireCreateForm from "../Commentaire/CommentaireCreateForm";

// Imports
import {
  Button,
  Col,
  Row,
  Collapsible,
  CollapsibleItem,
  Container,
  CardPanel,
  Modal,
  Chip,
  Icon
} from "react-materialize";

// Keywords
class Keywords extends Component {
  render() {
    const copy = [];
    if (this.props.keywords) {
      const tab = this.props.keywords.split(",").forEach(element => {
        copy.push(element);
      });
    }

    return (
      <Row>
        {copy &&
          Object.keys(copy)
            .sort()
            .reverse()
            .map(key => (
              <div>
                <Col>
                  <Chip>{copy[key]}</Chip>
                </Col>
              </div>
            ))}
      </Row>
    );
  }
}

/* OneArticle */
class OneArticle extends Component {
  constructor(props) {
    super(props);
  }

  handleClick(id) {
    db.removeArticle(id);
    history.push(routes.LANDING);
  }

  componentDidMount() {
    const { onSetUsers } = this.props;
    db.onceGetUsers().then(snapshot => onSetUsers(snapshot.val()));
  }

  handleClickExit(id, authUser, actualLimite) {
    /* Incrémente la limite actuelle de 1 (différent de la limite maximum d'un article) */
    db.decrementeArticleLimite(id, actualLimite - 1);
    /* Ajoute l'article dans la liste des articles dont l'utilisateur participe */
    db.removeParticipatedArticleToUser(authUser.uid, id);
    /* Change de page */
    history.push(routes.LANDING);
  }
  render() {
    const { articles, authUser, users } = this.props;
    moment.locale("fr");

    return (
      <Container>
        <Col s={12} m={12} l={12}>
          {users.hasOwnProperty(articles.user) && (
            <h2 className="h2-title article-title text-left m-4 ">
              Un projet proposé par{" "}
              <strong>{users[articles.user].username}</strong>
            </h2>
          )}
        </Col>
        <Row>
          <Col s={12} m={6} l={6}>
            <Collapsible accordion>
              <CollapsibleItem
                className="collapsible-title"
                header="Identité de l'auteur"
                icon="more_vert"
              >
                {users.hasOwnProperty(articles.user) && (
                  <p className="collapsible-text">
                    <strong>Nom :</strong> {users[articles.user].name}
                  </p>
                )}
                {users.hasOwnProperty(articles.user) && (
                  <p className="collapsible-text">
                    <strong>Prénom :</strong> {users[articles.user].lastname}
                  </p>
                )}
                {users.hasOwnProperty(articles.user) && (
                  <p className="collapsible-text">
                    <strong>Nom d'utilisateur :</strong>{" "}
                    {users[articles.user].username}
                  </p>
                )}
              </CollapsibleItem>
              <CollapsibleItem
                className="collapsible-title"
                header="Date de création"
                icon="date_range"
              >
                <p className="collapsible-text">
                  <strong>
                    {moment(articles.date).format("Do MMMM YYYY")}
                  </strong>
                </p>
              </CollapsibleItem>
              <CollapsibleItem
                className="collapsible-title"
                header="Description"
                icon="format_align_center"
              >
                <p className="collapsible-text">{articles.description}</p>
              </CollapsibleItem>
              <CollapsibleItem
                className="collapsible-title"
                header="Thème"
                icon="bookmark"
              >
                <p className="collapsible-text">{articles.theme}</p>
              </CollapsibleItem>
              <CollapsibleItem
                className="collapsible-title keywordsList"
                header="Mots-clés"
                icon="apps"
              >
                <Keywords keywords={articles.keywords} />
              </CollapsibleItem>
            </Collapsible>
            {authUser.uid === articles.user ? (
              <p>
                {" "}
                Il reste encore {articles.limite - articles.actualLimite} places
                sur votre idée{" "}
              </p>
            ) : (
              <Button
                className="btn deleteCom"
                waves="light"
                onClick={() => {
                  this.handleClickExit(
                    articles.id,
                    authUser,
                    articles.actualLimite
                  );
                }}
              >
                {" "}
                Quitter le projet
                <Icon left>exit_to_app</Icon>
              </Button>
            )}
          </Col>

          <Col s={12} m={6} l={6}>
            <img
              className="responsive-img"
              src="http://materializecss.com/images/parallax1.jpg"
              alt=""
            />
          </Col>
        </Row>

        <Row>
          {articles.id &&
            (users[articles.user] && (
              <CommentairePage
                articleAuthor={articles.user}
                authUser={authUser}
                authUserName={users[articles.user].username}
                articleId={articles.id}
                article={articles}
              />
            ))}

          <Col s={12} m={6} l={6}>
            <Col className="center-align" s={12} m={12} l={12}>
              <h3 className="h3-title ajout-commentaire">Nouveau message</h3>
              <Modal
                header="Ajouter un message"
                trigger={
                  <Button
                    floating
                    large
                    className="btn"
                    waves="light"
                    icon="add"
                  />
                }
              >
                {articles.id && (
                  <CommentaireCreateForm
                    articleID={articles.id}
                    authUser={authUser}
                    history={history}
                    article={articles}
                  />
                )}
              </Modal>
            </Col>
            {authUser.uid === articles.user && (
              <Col className="center-align" s={12} m={12} l={12}>
                <h3 className="h3-title modification-article">
                  Modifier l'idée
                </h3>
                <Modal
                  header="éditez votre idée"
                  trigger={
                    <Button
                      floating
                      large
                      className="btn"
                      waves="light"
                      icon="mode_edit"
                    />
                  }
                >
                  {users[articles.user] && (
                    <OneArticleEditForm
                      articles={articles}
                      history={history}
                      authUser={users[articles.user].username}
                    />
                  )}
                </Modal>
              </Col>
            )}
            {authUser.uid === articles.user && (
              <Col className="center-align" s={12} m={12} l={12}>
                <h3 className="h3-title modification-article">
                  Supprimer l'idée
                </h3>
                <Modal
                  header="Souhaitez-vous vraiment supprimer ce projet ?"
                  trigger={
                    <Button
                      floating
                      large
                      className="red"
                      waves="light"
                      icon="delete_forever"
                    />
                  }
                >
                  <br />
                  <Container>
                    <Row className="center-align vertical-wrapper">
                      <Col s={6} m={6} l={6}>
                        <Button
                          className="modal-close red"
                          waves="light"
                          onClick={() => {
                            this.handleClick(articles.id);
                          }}
                        >
                          Oui
                        </Button>
                      </Col>
                      <Col s={6} m={6} l={6}>
                        <Button className="modal-close">Non</Button>
                      </Col>
                    </Row>
                  </Container>
                </Modal>
              </Col>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  users: state.userState.users
});

const mapDispatchToProps = dispatch => ({
  onSetUsers: users => dispatch({ type: "USERS_SET", users })
});

export default connect(mapStateToProps, mapDispatchToProps)(OneArticle);
