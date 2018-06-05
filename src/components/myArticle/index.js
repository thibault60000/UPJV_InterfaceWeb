import React, { Component } from "react";

// Components
import MyArticleList from "./myArticleList";
import Navigation from "../Navigation/index";
import Bottom from "../Bottom";

// Materialize
import { Container, Row, Col } from "react-materialize";

// Image
import ampouleBlack from "../../assets/images/ampouleImgBlack.jpg";
import computer from "../../assets/images/computer.jpg";
import computer2 from "../../assets/images/computer2.jpg";
// Routes
import * as routes from "../../constants/routes";

// Redux
import { connect } from "react-redux";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import withAuthorization from "../Session/withAuthorization";
import { history } from "../../store";

// Firebase
import { db } from "../../firebase";

class MyArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: history
    };
  }

  componentDidMount() {
    const { onSetArticles, authUser } = this.props;
    if (authUser) {
      db.onceGetOneArticleUser(authUser.uid).on("value", function(snapshot) {
        onSetArticles(snapshot.val());
      });
    }
  }

  render() {
    const { articles } = this.props;

    return (
      <div>
        <Navigation />

        <div className="parallax-container">
          <div className="center-align">
            <Row>
              <h1 className="home-h1-title bold title-parallax-without-elements">
               Retrouvez vos idées
              </h1>
            </Row>
          </div>
          <div className="parallax">
            <img src={computer2} />
          </div>
          <Row className="valign-wrapper center-align">
            <a className="return-btn" href={routes.LANDING}>
              ◄ Retour
            </a>
          </Row>
        </div>

        <Container>
          <MyArticleList articles={articles} history={history} />
        </Container>

        <Bottom />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.articleState.articles,
  authUser: state.sessionState.authUser
});

const mapDispatchToProps = dispatch => ({
  onSetArticles: articles => dispatch({ type: "ARTICLES_SET", articles })
});

const authCondition = authUser => !!authUser;

const exportConfig = compose(
  withRouter,
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
);

export default exportConfig(MyArticle);
