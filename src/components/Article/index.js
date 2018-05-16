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

import {Row} from 'react-materialize';
import Bottom from "../Bottom";

import image3 from '../../assets/images/background3.jpg';

class ArticlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: history
    };
  }


  render() {
    const { authUser } = this.props;
    console.log("index", authUser);
    return (
      <div>
        <Navigation />
        <div className="parallax-container">
            <div className="valign-wrapper center-align">
                <Row>
                    <h2 className="home-h2-title" id="titreCreaIdea">Créer une idée </h2>
                </Row>
            </div>
            <div className="parallax paraCrea">
                <img src={image3} />
            </div>
            <a href="#" id="returnBtnCrea"> _Retour </a>
        </div>
        
        <ArticleCreateForm
          authUser={this.props.authUser}
          history={this.state.history}
        />
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
