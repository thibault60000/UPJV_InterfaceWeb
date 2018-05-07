import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Navigation from '../Navigation';
import withAuthorization from '../Session/withAuthorization';
import { db } from '../../firebase';

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
        <hr />
        <h1>Page d'Accueil</h1>
        <hr />
        <p>Cette page est accessible seulement pour un utilisateur authentifié</p>
        <hr />
        { !!users && <UserList users={users} /> }
      </div>
    );
  }
}

const UserList = ({ users }) =>
  <div>
    <h2>Liste des utilisateurs : </h2>

    <ul>  
    {Object.keys(users).map(key => 
      <li key={key}>
        {users[key].username}
      </li>
    )}
    </ul>
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
