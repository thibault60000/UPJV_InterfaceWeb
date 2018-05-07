import React, { Component } from "react";

import { db, st } from "../../firebase";
import firebase from 'firebase';

import * as routes from "../../constants/routes";
import { connect } from "react-redux";
import { history } from '../../store';

import * as moment from 'moment';
import 'moment/locale/fr';

import OneArticleEditForm from './OneArticleEditForm';


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

      // Image URL
      articles.urlImg && (
        st.doGetArticlesImg(articles.urlImg).then((url) => {
          var test = url;
          document.getElementById("imgOneArticle").src = test;
        }).catch((error) => {
           console.log(error);
        })
      )
        return (
          <div className="oneArticle">
              <img id="imgOneArticle" alt="Illustration article" />
              <span> Titre : { articles.title }</span>
              <span> Description :{articles.description } </span>
              {
                articles.editDate && <span> Edité le { moment(articles.editDate).format('Do MMMM YYYY') } </span>
              }
              {
                !articles.editDate && <span> Créé le { moment(articles.date).format('Do MMMM YYYY') } </span>
              }
              <span> ID :  {articles.id } </span>
              <span> {articles.likes } j'aime </span>
              {
                users.hasOwnProperty(articles.user) && <span> Créé par : { users[articles.user].username } </span>                   
              }              
              { authUser.uid === articles.user && <span><button onClick={ () => { this.handleClick(articles.id) } }> Supprimer l'article</button></span> }
              <hr />
              { authUser.uid === articles.user && <OneArticleEditForm articles={articles} history={history} authUser={ users[articles.user].username } /> }
              { authUser.uid !== articles.user && <p> Créé par { articles.user } </p> }
              {
                
              }
          </div>
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
  