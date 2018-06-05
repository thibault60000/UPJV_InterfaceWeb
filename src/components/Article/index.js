import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import { history } from "../../store";
import * as routes from "../../constants/routes";

// HOC
import withAuthorization from "../Session/withAuthorization";

// Components
import Navigation from "../Navigation";
import ArticleCreateForm from "./ArticleCreateForm";

import { Container, Row, Col } from "react-materialize";
import Bottom from "../Bottom";


// IMAGE 
import creation from "../../assets/images/creation.jpg";

class ArticlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: history
    };
  }

  render() {
    const { authUser } = this.props;
    return (
      <div>
        <Navigation />
        <div className="parallax-container">
          <div className="center-align">
            <Row>
              <h1 className="home-h1-title bold title-parallax-without-elements">
                Créer une idée{" "}
              </h1>
            </Row>
          </div>
          <div className="parallax">
            <img src={creation} />
          </div>
          <Row className="valign-wrapper center-align">
            <a className="return-btn" href={routes.LANDING}>
              ◄ Retour
            </a>
          </Row>
        </div>

        <Container>
          <Row className="m-5">
            <Col s={12} m={12} l={12}>
              <ArticleCreateForm
                authUser={this.props.authUser}
                history={this.state.history}
              />
            </Col>
          </Row>
        </Container>
        <Bottom />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

const authCondition = authUser => !!authUser;

const exportConfig = compose(
  withRouter,
  withAuthorization(authCondition),
  connect(mapStateToProps, null)
);

export default exportConfig(ArticlePage);
