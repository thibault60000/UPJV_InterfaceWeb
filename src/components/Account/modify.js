import React, { Component } from 'react';
import { connect } from "react-redux";

import { auth, db } from '../../firebase';
import * as routes from '../../constants/routes';

import Navigation from "../Navigation";
import Bottom from "../Bottom";

import contact from '../../assets/images/contact.jpg';

import { Container, Button, Input, Row } from 'react-materialize';

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

class ModifyAccountForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.authUser.uid,
            email: this.props.email,
            name: this.props.name,
            lastname: this.props.lastname,
            authUser: this.props.authUser,
            error: null,
            statut: this.props.statut,
            history: this.props.history,
        };
      }

  onSubmit = (event) => {
    const {
        id,
        email,
        name,
        lastname,
        statut,
    } = this.state;

    const { history } = this.state;

    // Enregistrement des informations dans la DB
    db.updateUser(
        id,
        email,
        statut,
        name,
        lastname,
    ).catch(error => {
        this.setState(updateByPropertyName("error", error));
    });

    // Modification de l'authentification Firebase
    auth.doEmailUpdate(
        email,
    ).catch(error => {
        this.setState(updateByPropertyName("error", error));
    });

    history.push(routes.ACCOUNT);
    event.preventDefault();
  }

  render() {
    const { authUser } = this.props;
    const {
        email,
        name,
        lastname,
        username,
        error,
        statut
    } = this.props;

    console.log(email);

    const isInvalid =
      email === ''
      name === '' ||
      lastname === '' ||
      statut === '';

    return (
      <Container>
        <Row className="center-align">
          { error && <p s={12} m={12} l={12} className="error">{error.message}</p> }
          <form onSubmit={this.onSubmit}>
           <Input
              s={12}
              m={6}
              l={6}
              label="Nom"
              id="name"
              defaultValue={name}
              onChange={event => this.setState(updateByPropertyName('name', event.target.value))}
              type="text"
            />
            <Input
              s={12}
              m={6}
              l={6}
              label="Prénom"
              id="lastname"
              defaultValue={lastname}
              onChange={event => this.setState(updateByPropertyName('lastname', event.target.value))}
              type="text"
            />
            <Input
              s={12}
              m={6}
              l={6}
              label="Identifiant"
              defaultValue={username}
              disabled
              id="username"
              type="text"
            />
            <Input
              s={12}
              m={6}
              l={6}
              defaultValue={email}
              label="Adresse e-mail"
              id="email"
              onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
              type="email"
            />
            <Input 
              s={12}
              m={12}
              l={12}
              id='statut'
              type='select'
              label="Statut"
              defaultValue={statut}
              onChange={ event => this.setState(updateByPropertyName('statut', event.target.value)) }>
              <option value=''>Choisissez</option>
              <option value="college">Collège</option>
              <option value="lycee">Lycée</option>
              <option value="licence">Licence</option>
              <option value="master">Master</option>
              <option value="doctorat">Doctorat</option>
              <option value="professionnel">Professionnel</option>
              <option value="association">Association</option>
            </Input>

            <Button
              s={12}
              m={12}
              l={12}
              disabled={isInvalid}
              type="submit">
              Valider mes informations
            </Button>
          </form>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
    authUser: state.sessionState.authUser
});

export default connect(mapStateToProps)(ModifyAccountForm);
