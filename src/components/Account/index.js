import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { history } from "../../store";

import withAuthorization from "../Session/withAuthorization";

/* Images */
import contact from "../../assets/images/contact.jpg";

/* Components */
import Navigation from "../Navigation";
import Bottom from "../Bottom";
import PasswordChangeForm from "../PasswordChange";
import ModifyAccountForm from "./modify";

// Firebase
import { db } from "../../firebase";

import {
  Collapsible,
  CollapsibleItem,
  Icon,
  Container,
  Col,
  Row,
  Tabs,
  Tab
} from "react-materialize";

class AccountPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { onSetUsers } = this.props;
    db.onceGetUsers().then(snapshot => onSetUsers(snapshot.val()));
  }

  render() {
    const { authUser, users } = this.props;
    console.log(users);
    console.log(authUser.uid);
    const userInfos = users[authUser.uid];

    return (
      <div>
        <Navigation />

        <div className="parallax-container">
          <div className="center-align">
            <Row>
              <h1 className="home-h1-title bold title-parallax-without-elements">
                Mon compte
              </h1>
            </Row>
          </div>
          <div className="parallax">
            <img src={contact} />
          </div>
        </div>

        <Container>
          <Row className="m-5">
            <h3> Voici les informations sur votre compte</h3>
            <p>
              {" "}
              Vous pouvez les consulter , les modifier et changer votre mot de
              passe.
            </p>
            <br />
            {userInfos && (
              <Tabs>
                <Tab title="Mes informations" active>
                  <Row className="m-5">
                    <Col s={12} m={12} l={6}>
                      <Collapsible accordion>
                        <CollapsibleItem header="Identité" icon="face">
                          <div className="valign-wrapper">
                            <Icon>keyboard_arrow_right</Icon>
                            <p className="text">
                              <strong>Nom d'utilisateur : </strong>
                              {userInfos && userInfos.username}
                            </p>
                          </div>
                          <div className="valign-wrapper">
                            <Icon>keyboard_arrow_right</Icon>
                            <p className="text">
                              <strong>Nom : </strong>
                              {userInfos && userInfos.name}
                            </p>
                          </div>
                          <div className="valign-wrapper">
                            <Icon>keyboard_arrow_right</Icon>
                            <p className="text">
                              <strong>Prénom : </strong>
                              {userInfos && userInfos.lastname}
                            </p>
                          </div>
                        </CollapsibleItem>
                        <CollapsibleItem header="Adresse e-mail" icon="email">
                          <div className="valign-wrapper">
                            <Icon>keyboard_arrow_right</Icon>
                            <p className="text">
                              {userInfos && userInfos.email}
                            </p>
                          </div>
                        </CollapsibleItem>
                        <CollapsibleItem header="Statut" icon="group">
                          <div className="valign-wrapper">
                            <Icon>keyboard_arrow_right</Icon>
                            <p className="text">
                              {userInfos && userInfos.statut}
                            </p>
                          </div>
                        </CollapsibleItem>
                        <CollapsibleItem header="Nombre d'idées" icon="message">
                          <div className="valign-wrapper">
                            <Icon>keyboard_arrow_right</Icon>
                            <p className="text">24</p>
                          </div>
                        </CollapsibleItem>
                      </Collapsible>
                    </Col>
                    <Col s={12} m={12} l={6}>
                      <img className="responsive-img" src={contact} />
                    </Col>
                  </Row>
                </Tab>
                <Tab title="Modifier mes informations">
                  <Row className="m-5">
                    <ModifyAccountForm
                      users={users}
                      authUser={authUser}
                      name={userInfos && userInfos.name}
                      lastname={userInfos && userInfos.lastname}
                      username={userInfos && userInfos.username}
                      statut={userInfos && userInfos.statut}
                      email={userInfos && userInfos.email}
                      history={history}
                    />
                  </Row>
                </Tab>
                <Tab title="Changer de mot de passe">
                  <Row className="m-5">
                    <PasswordChangeForm />
                  </Row>
                </Tab>
              </Tabs>
            )}
          </Row>
        </Container>

        <Bottom />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
  users: state.userState.users
});

const mapDispatchToProps = dispatch => ({
  onSetUsers: users => dispatch({ type: "USERS_SET", users })
});

const authCondition = authUser => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(AccountPage);
