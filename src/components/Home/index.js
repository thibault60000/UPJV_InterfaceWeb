import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import withAuthorization from '../Session/withAuthorization';
import { db } from '../../firebase';
import * as routes from '../../constants/routes';

import Navigation from '../Navigation';
import Bottom from '../Bottom';
import ArticleList from '../Article/ArticleList';

import {Parallax, Row, Modal, Button} from 'react-materialize';

import image3 from '../../assets/images/background3.jpg';

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
                    <h2 className="home-h2-title" id="titreHome">Êtes-vous prêts ?</h2>
                </Row>
            </div>
            <div className="valign-wrapper center-align">
                <Row>
                  <a className="btn test" href={routes.ARTICLE}>Créer une idée</a>
                </Row>
            </div>
            <div className="parallax">
                <img src={image3} />
            </div>
        </div>
        
        <div className="container displayArticleHome ">
          <h2 className="h2-title">Les derniers projets <em>du moment</em></h2>
          { !!articles && <ArticleList />}
          { !articles && <p>Dommage, il n'y a pas d'articles</p>}
        </div>
        <Bottom />
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
