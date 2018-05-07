import React, { Component } from "react";

import { db, st } from "../../firebase";
import firebase from 'firebase';

import * as routes from "../../constants/routes";
import { connect } from "react-redux";
import { history } from '../../store';

import * as moment from 'moment';
import 'moment/locale/fr';

import OneArticleEditForm from './OneArticleEditForm';

import { Card, CardTitle, Button, Col, Row } from "react-materialize";

/* Liste d'articles */
class OneArticle extends Component{
    constructor(props) {
        super(props);
      }

    handleClick(id) {
      db.removeArticle(id);
      history.push(routes.ARTICLE);
    }

    componentDidMount() {
      const { onSetUsers, } = this.props;
      /* Users */
      db.onceGetUsers().then(snapshot => onSetUsers(snapshot.val()));
    }

    render(){
      const { articles, authUser } = this.props;

      moment.locale('fr');

      const { users } = this.props;

        return (

          <Col m={6} s={12}>
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
          </Col>
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
  