import React, { Component } from "react";
import { connect } from "react-redux";
import { history } from "../../store";

// Firebase
import { db, st } from "../../firebase";

/* Moment.js */
import * as moment from 'moment';
import 'moment/locale/fr';

class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      image: {}
    }
  }

  handleClick(id) {
    history.push(`article/${id}`);
  }

  componentDidMount() {
    /* Users */
    const { onSetUsers } = this.props; 
    db.onceGetUsers().then(snapshot => onSetUsers(snapshot.val())); 
  }
  
  getImage (image) {
    let { state } = this
    st.doGetArticlesImg(image).then((url) => {
      state[image] = url
      this.setState(state)
    }).catch((error) => {
       console.log(error);
    })
  }

  render() {
    const { articles, users } = this.props;
    moment.locale('fr');
    

    return (
      <div>
        <hr />
        <h2>Liste des articles </h2>
        <hr />

          <ul className="articlesList">
            {Object.keys(articles)
              .sort()
              .reverse()
              .map(key => (
                <li key={key}>
                  
                  <span> TITRE : {articles[key].title}</span>
                  <span> ID : {articles[key].id}</span>
                  <span> DESCRIPTION : {articles[key].description}</span>

                  { /* USERNAME */
                    users.hasOwnProperty(articles[key].user) && <span> Créé par : { users[articles[key].user].username } </span>                   
                  }        
                  { /* DATE EDITION */ 
                    articles[key].editDate && <span> Edité le { moment(articles[key].editDate).format('Do MMMM YYYY') } </span>
                  }
                  { /* DATE CREATION */ 
                    !articles[key].editDate && <span> Créé le { moment(articles[key].date).format('Do MMMM YYYY') } </span>
                  }           
                  { /* IMAGE */
                    articles[key].urlImg && 
                    (     
                      this.getImage(articles[key].urlImg),
                      <img src={ this.state[articles[key].urlImg] } />
                    )
                  }
    
                  <span>
                  
                    <button
                      onClick={() => {
                        this.handleClick(articles[key].id);
                      }}
                    >
                    Voir l'article
                    </button>
                  </span>
                </li>
              ))}
          </ul>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  articles: state.articleState.articles,
  users: state.userState.users
});

const mapDispatchToProps = dispatch => ({
  onSetArticles: articles => dispatch({ type: "ARTICLES_SET", articles }),
  onSetUsers: users => dispatch({ type: "USERS_SET", users }),
});


export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);


    /*for (let key in users) {
        if (users.hasOwnProperty(key)) {           
            console.log(key, users[key].username);
        }
      } */