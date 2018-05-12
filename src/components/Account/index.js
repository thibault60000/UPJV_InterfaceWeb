import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import PasswordChangeForm from '../PasswordChange';
import withAuthorization from '../Session/withAuthorization';

import image3 from '../../assets/images/background3.jpg';

import Navigation from '../Navigation';
import Bottom from "../Bottom";

import {Collapsible, CollapsibleItem, Icon, Container, Col, Row, Tabs, Tab} from 'react-materialize'

const AccountPage = ({ authUser }) =>
  <div>
    <Navigation />
    <div className="parallax-container">
      <div className="center-align">
          <Row>
            <h1 className="home-h1-title bold title-parallax-without-elements">Mon compte</h1>
          </Row>
      </div>
      <div className="parallax">
        <img src={image3}/>
      </div>
    </div>
    <Container>
      <Row className="m-5">
        <Tabs>
            <Tab title="Mes informations" active>
              <Row className="m-5">
                <Col s={12} m={12} l={6}>
                  <Collapsible>
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
                      <Icon>keyboard_arrow_right</Icon><p className="text">{authUser.status}</p>
                      </div>
                    </CollapsibleItem>
                  </Collapsible>
                </Col>
                <Col s={12} m={12} l={6}>
                  <img className="responsive-img" src={image3}/>
                </Col>
              </Row>
            </Tab>
            <Tab title="Modifier mes informations">
              <Row>
              </Row>
            </Tab>
            <Tab title="Changer de mot de passe" >
              <Row className="m-5">
                <PasswordChangeForm />
              </Row>
            </Tab>
        </Tabs>
      </Row>
    </Container>
    <Bottom />
  </div>

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps)
)(AccountPage);