import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import withAuthorization from '../Session/withAuthorization';
import { db } from '../../firebase';
import * as routes from '../../constants/routes';

import Navigation from '../Navigation';
import Footer from '../Footer';
import ArticleList from '../Article/ArticleList';

import {Parallax, Row, Modal, Button} from 'react-materialize';

class HomePage extends Component {
  componentDidMount() {
    const { onSetUsers } = this.props;
    const { onSetArticles } = this.props;

    db.onceGetUsers().then(snapshot =>
      onSetUsers(snapshot.val())
    );
    db.onceGetArticles().then(snapshot => 
      onSetArticles(snapshot.val())
    );
  }

  render() {
    const { articles } = this.props;

    return (
      <div>
        <Navigation />
        <div className="parallax-container">
            <div className="valign-wrapper center-align">
                <Row>
                    <h2 className="home-h2-title">Êtes-vous prêts ?</h2>
                </Row>
            </div>
            <div className="valign-wrapper center-align">
                <Row>
                  <a className="btn test" href={routes.ARTICLE}>Créer une idée</a>
                </Row>
            </div>
            <div className="parallax">
                <img src="http://materializecss.com/images/parallax1.jpg"/>
            </div>
        </div>
        
        <h2 className="h2-title">Les derniers projets du moment</h2>
        { !!articles && <ArticleList />}
        { !articles && <p>Dommage, il n'y a pas d'articles</p>}
        <Footer />
      </div>
    );
  }
}

/* { !!users && <UserList users={users} /> } */
/*const UserList = ({ users }) =>
  <div>
    <p>Remerciements pour les nouveaux membres : </p>

    <Collection>
      {Object.keys(users).map(key => 
        <CollectionItem key={key}>{users[key].username}</CollectionItem>
      )}
    </Collection>
  </div>*/

const mapStateToProps = (state) => ({
  articles: state.articleState.articles,
  users: state.userState.users,
});

const mapDispatchToProps = (dispatch) => ({
  onSetUsers: (users) => dispatch({ type: 'USERS_SET', users }),
  onSetArticles: articles => dispatch({ type: "ARTICLES_SET", articles })
});

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(HomePage);
