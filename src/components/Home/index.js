import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Navigation from '../Navigation';
import withAuthorization from '../Session/withAuthorization';
import { db } from '../../firebase';
import {Collection, CollectionItem} from 'react-materialize'
class HomePage extends Component {
  componentDidMount() {
    const { onSetUsers } = this.props;

    db.onceGetUsers().then(snapshot =>
      onSetUsers(snapshot.val())
    );
  }

  render() {
    const { users } = this.props;

    return (
      <div>
        <Navigation />
        <h1>Page d'Accueil</h1>
        <p>Cette page est accessible seulement pour un utilisateur authentifié</p>
        { !!users && <UserList users={users} /> }
      </div>
    );
  }
}

const UserList = ({ users }) =>
  <div>
    <p>Remerciements pour les nouveaux membres : </p>

    <Collection>
      {Object.keys(users).map(key => 
        <CollectionItem key={key}>{users[key].username}</CollectionItem>
      )}
    </Collection>
  </div>

const mapStateToProps = (state) => ({
  users: state.userState.users,
});

const mapDispatchToProps = (dispatch) => ({
  onSetUsers: (users) => dispatch({ type: 'USERS_SET', users }),
});

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(HomePage);
