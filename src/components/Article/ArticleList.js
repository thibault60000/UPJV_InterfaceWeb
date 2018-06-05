import React, { Component } from "react";
import { connect } from "react-redux";
import { history } from "../../store";

// Materialize
import { Card, CardTitle, Button, Col, Row, Icon } from "react-materialize";

// Firebase
import { db } from "../../firebase";

/* Moment.js */
import * as moment from "moment";
import "moment/locale/fr";

// Components
import sampleArticle from "../../assets/images/sample-1.jpg";



class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      image: {}
    };
  }

  handleClick(id, actualLimite, authUser) {
    /* Incrémente la limite actuelle de 1 (différent de la limite maximum d'un article) */
    db.incrementeArticleLimite(id, actualLimite + 1);
    /* Ajoute l'article dans la liste des articles dont l'utilisateur participe */
    db.addParticipatedArticleToUser(authUser.uid, id);
    /* Change de page */
    history.push(`article/${id}`);
  }

  handleClickSeeOnly(id) {
    history.push(`article/${id}`);
  }
  componentDidMount() {
    const { onSetUsers } = this.props;
    db.onceGetUsers().then(snapshot => onSetUsers(snapshot.val()));
  }

  /* Convertir objet en tableau de valeurs */
  testIfValueIsOnObject(obj) {
    const array = [];
    if (obj === undefined) {
      array.push("null");
    } else {
      Object.keys(obj).map(key => array.push(obj[key]));
    }

    return array;
  }

  render() {
    const { articles, users, authUser } = this.props;
    moment.locale("fr");
    const array = new Array();
    return (
      <div>
        <Row>
          {Object.keys(articles)
            .sort()
            .reverse()
            .map(key => (
              <span>
                {articles[key].isPublic && (
                  <Col s={12} m={6} l={4} key={key}>
                    <Card
                      header={
                        <CardTitle image={sampleArticle}>
                          {articles[key].title}{" "}
                        </CardTitle>
                      }
                      actions={[
                        authUser.uid === articles[key].user ? (
                          <Button
                            className="btn background-edit"
                            waves="light"
                            onClick={() => {
                              this.handleClickSeeOnly(articles[key].id);
                            }}
                          >
                            {" "}
                            Modifier
                            <Icon left>create</Icon>
                          </Button>
                        ) : articles[key].actualLimite >=
                        articles[key].limite ? (
                          <Button className="btn background-red" waves="light">
                            {" "}
                            Complet
                            <Icon left>close</Icon>
                          </Button>
                        ) : (
                          users[authUser.uid] &&
                          ((this.array = this.testIfValueIsOnObject(
                            users[authUser.uid].participatedArticles
                          )),
                          this.array.includes(articles[key].id) ? (
                            <Button
                              className="btn background-green"
                              waves="light"
                              onClick={() => {
                                this.handleClickSeeOnly(articles[key].id);
                              }}
                            >
                              {" "}
                              Consulter
                              <Icon left>remove_red_eye</Icon>
                            </Button>
                          ) : (
                            <Button
                              className="btn background-brown"
                              waves="light"
                              onClick={() => {
                                this.handleClick(
                                  articles[key].id,
                                  articles[key].actualLimite,
                                  authUser
                                );
                              }}
                            >
                              {" "}
                              Participer
                              <Icon left>check</Icon>
                            </Button>
                          ))
                        ),

                        /* Si il y a des commentaires */
                        articles[key].comments > 1 && (
                          <span className="right many">
                            {" "}
                            {articles[key].comments} messages{" "}
                          </span>
                        ),
                        /* Si il y a un commentaire */
                        articles[key].comments == 1 && (
                          <span className="right one">
                            {" "}
                            {articles[key].comments} messages{" "}
                          </span>
                        ),
                        /* S'il n'y a pas de commentaire */
                        articles[key].comments == 0 && (
                          <span className="right zero"> Aucun message </span>
                        )
                      ]}
                    >
                      <p>
                        <strong>Thème</strong> : {articles[key].theme}
                        <span className="restants">
                          {articles[key].limite - articles[key].actualLimite}{" "}
                          {" places restantes "}
                        </span>
                      </p>
                      <br />
                      {users.hasOwnProperty(articles[key].user) && (
                        <p>
                          Créé par{" "}
                          <strong>{users[articles[key].user].username}</strong>{" "}
                          le{" "}
                          <strong>
                            {moment(articles[key].date).format("Do MMMM YYYY")}
                          </strong>
                        </p>
                      )}
                    </Card>
                  </Col>
                )}
              </span>
            ))}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.articleState.articles,
  users: state.userState.users
});

const mapDispatchToProps = dispatch => ({
  onSetArticles: articles => dispatch({ type: "ARTICLES_SET", articles }),
  onSetUsers: users => dispatch({ type: "USERS_SET", users })
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
