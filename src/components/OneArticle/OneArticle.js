import React, { Component } from "react";

import * as routes from "../../constants/routes";
import { connect } from "react-redux";
import { history } from '../../store';

// Firebase
import { db } from "../../firebase";

// Moment.JS
import * as moment from 'moment';
import 'moment/locale/fr';

// Pages
import OneArticleEditForm from './OneArticleEditForm';
import CommentairePage from '../Commentaire/index';

import { Button, Col, Row, Collapsible, CollapsibleItem, Container, CardPanel, Modal } from "react-materialize";



class OneArticle extends Component{
    constructor(props) {
        super(props);
      }

    handleClick(id) {
      db.removeArticle(id);
      history.push(routes.LANDING);
    }

    componentDidMount() {
      const { onSetUsers } = this.props;
      db.onceGetUsers().then(snapshot => onSetUsers(snapshot.val()));
    }

    render(){
      const { articles, authUser } = this.props;

      moment.locale('fr');

      const { users } = this.props;

        return (
          <Container>
            <Col s={12} m={12} l={12}>
              { users.hasOwnProperty(articles.user) && <h2 className="h2-title article-title text-left m-4 ">Un projet proposé par <strong>{ users[articles.user].username }</strong></h2> }
            </Col>
            <Row>
              <Col s={12} m={6} l={6}>
                  <Collapsible>
                    <CollapsibleItem className="collapsible-title" header="Identité de l'auteur" icon='more_vert'>
                      { users.hasOwnProperty(articles.user) && <p className="collapsible-text"><strong>Nom :</strong> { users[articles.user].nom }</p> }
                      { users.hasOwnProperty(articles.user) && <p className="collapsible-text"><strong>Prénom :</strong> { users[articles.user].prenom }</p> }
                      { users.hasOwnProperty(articles.user) && <p className="collapsible-text"><strong>Nom d'utilisateur :</strong> { users[articles.user].username }</p> }
                    </CollapsibleItem>
                    <CollapsibleItem className="collapsible-title" header='Date de création' icon='date_range'>
                      <p className="collapsible-text"><strong>{ moment(articles.date).format('Do MMMM YYYY') }</strong></p>
                    </CollapsibleItem>
                    <CollapsibleItem className="collapsible-title" header='Description' icon='format_align_center'>
                      <p className="collapsible-text">{ articles.description }</p>
                    </CollapsibleItem>
                    <CollapsibleItem className="collapsible-title" header='Thème' icon='bookmark'>
                      <p className="collapsible-text">{ articles.theme }</p>
                    </CollapsibleItem>
                    <CollapsibleItem className="collapsible-title" header='Mots-clés' icon='apps'>
                      <p className="collapsible-text">{ articles.keywords }</p>
                    </CollapsibleItem>
                  </Collapsible>
              </Col>
              <Col s={12} m={6} l={6}>
                <img className="responsive-img" src="http://materializecss.com/images/parallax1.jpg" alt=""/>
              </Col>
            </Row>
            <Row>
              <Col s={12} m={6} l={6}>
              <CardPanel className="valign-wrapper">
                    <Col s={2} m={2} l={2}>
                      <img src="http://materializecss.com/images/parallax1.jpg" alt="" className="circle responsive-img" />
                    </Col>
                    <Col s={10} m={10} l={10}>
                      <p className="black-text commentaire">This is a square image. Add the "circle" class to it to make it appear circular.</p>
                    </Col>
                  </CardPanel>
                  <CardPanel className="valign-wrapper">
                    <Col s={2} m={2} l={2}>
                      <img src="http://materializecss.com/images/parallax1.jpg" alt="" className="circle responsive-img" />
                    </Col>
                    <Col s={10} m={10} l={10}>
                      <p className="black-text commentaire">This is a square image. Add the "circle" class to it to make it appear circular.</p>
                    </Col>
                  </CardPanel>
                  <CardPanel className="valign-wrapper">
                    <Col s={2} m={2} l={2}>
                      <img src="http://materializecss.com/images/parallax1.jpg" alt="" className="circle responsive-img" />
                    </Col>
                    <Col s={10} m={10} l={10}>
                      <p className="black-text commentaire">This is a square image. Add the "circle" class to it to make it appear circular.</p>
                    </Col>
                  </CardPanel>
              </Col>
              <Col s={12} m={6} l={6}>
                  <Col className="center-align" s={12} m={12} l={12}>
                    <h3 className="h3-title ajout-commentaire">Nouveau commentaire</h3>
                    <Modal
                      header='Ajouter un commentaire'
                      trigger={<Button floating large className='btn' waves='light' icon='add' />}>
                      {/* <AddCommentaireForm /> */}
                    </Modal>
                  </Col>
                  { authUser.uid === articles.user && 
                    <Col className="center-align" s={12} m={12} l={12}>
                      <h3 className="h3-title modification-article">Modifier l'article</h3>
                      <Modal
                        header='éditez votre idée'
                        trigger={<Button floating large className='btn' waves='light' icon='mode_edit' />}>
                        <OneArticleEditForm articles={articles} history={history} authUser={ users[articles.user].username } />
                      </Modal>
                    </Col>
                  }
                  { authUser.uid === articles.user && 
                    <Col className="center-align" s={12} m={12} l={12}>
                      <h3 className="h3-title modification-article">Supprimer l'article</h3>
                      <Modal
                        header='Souhaitez-vous vraiment supprimer ce projet ?'
                        trigger={<Button floating large className='red' waves='light' icon='delete_forever' />}>
                        <br />
                        <Container>
                          <Row className="center-align vertical-wrapper">
                            <Col s={6} m={6} l={6}>
                              <Button className='modal-close red' waves='light' onClick={ () => { this.handleClick(articles.id) } }>Oui</Button>
                            </Col>
                            <Col s={6} m={6} l={6}>
                              <Button className="modal-close">Non</Button>
                            </Col>
                          </Row>
                        </Container>
                      </Modal>
                    </Col>
                  }
              </Col>
            </Row>
          </Container>
      )
    }
  }

const mapStateToProps = state => ({
  users: state.userState.users
});

const mapDispatchToProps = dispatch => ({
  onSetUsers: users => dispatch({ type: "USERS_SET", users }),
});


export default connect(mapStateToProps, mapDispatchToProps)(OneArticle);  

  /*
              <Card className='blue-grey darken-1' textClassName='white-text' title='Card title' >
              <p> <strong>Titre : </strong> { articles.title }</p>
              <p> <strong> Description : </strong>{articles.description } </p>
              {
                articles.editDate && <p> <strong> Edité le : </strong> { moment(articles.editDate).format('Do MMMM YYYY') } </p>
              }
              {
                !articles.editDate && <p> <strong> Créé le : </strong> { moment(articles.date).format('Do MMMM YYYY') } </p>
              }
              {
                users.hasOwnProperty(articles.user) && <p> <strong>Idée de : par : </strong> { users[articles.user].username } </p>                   
              }              
              { authUser.uid === articles.user && <p><Button className="btn waves-effect waves-light" waves="light" onClick={ () => { this.handleClick(articles.id) } }> Supprimer l'idée</Button></p> }
          
            </Card>
            { authUser.uid === articles.user && <OneArticleEditForm articles={articles} history={history} authUser={ users[articles.user].username } /> }
    */
