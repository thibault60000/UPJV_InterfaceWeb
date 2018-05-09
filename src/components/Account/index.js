import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {Collapsible, CollapsibleItem, Icon} from 'react-materialize'

import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import withAuthorization from '../Session/withAuthorization';
import Navigation from '../Navigation';

const AccountPage = ({ authUser }) =>
  <div>
    <Navigation />

    <h3 className="h3-title">Mes informations</h3>
    <hr className="separator"/>

    <Collapsible popout>
      <CollapsibleItem header="Nom d'utilisateur" icon="face" >
        <div className="valign-wrapper">
          <Icon>keyboard_arrow_right</Icon><p className="text">{authUser.username}</p>
        </div>
      </CollapsibleItem>
      <CollapsibleItem header='Adresse e-mail' icon="email">
        <div className="valign-wrapper">
          <Icon>keyboard_arrow_right</Icon><p className="text">{authUser.email}</p>
        </div>
      </CollapsibleItem>
      <CollapsibleItem header='Statut' icon="group">
        <div className="valign-wrapper">
         <Icon>keyboard_arrow_right</Icon><p className="text">{authUser.statut}</p>
        </div>
      </CollapsibleItem>
    </Collapsible>

    <PasswordForgetForm />
    <PasswordChangeForm />
  </div>

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps)
)(AccountPage);