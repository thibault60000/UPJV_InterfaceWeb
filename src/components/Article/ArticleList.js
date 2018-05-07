import React, { Component } from "react";
import { connect } from "react-redux";
import { history } from "../../store";
import { Card, CardTitle, Button, Col, Row } from "react-materialize";

// Firebase
import { db, st } from "../../firebase";

/* Moment.js */
import * as moment from "moment";
import "moment/locale/fr";

class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      image: {}
    };
  }

  handleClick(id) {
    history.push(`article/${id}`);
  }

  componentDidMount() {
    /* Users */
    const { onSetUsers } = this.props;
    db.onceGetUsers().then(snapshot => onSetUsers(snapshot.val()));
  }

  render() {
    const { articles, users } = this.props;
    moment.locale("fr");

    return (
      <div className="Container">
        <h2>Liste des articles </h2>

        <Row>
          {Object.keys(articles)
            .sort()
            .reverse()
            .map(key => (
              <Col m={6} s={12} key={key}>
                <Card className='blue-grey darken-1' textClassName='white-text' title={articles[key].title} >
                      <p>
                        <strong>Description :{articles[key].description}   </strong>
                      </p>
                      <p>
                        { 
                          users.hasOwnProperty(articles[key].user) && (
                            <span>
                            <strong> Créé par : </strong> {  users[articles[key].user].username } </span>
                          )
                        }
                      </p>
                      <p>
                        {
                          articles[key].editDate && (
                            <span><strong>
                              Edité le : </strong>
                              {moment(articles[key].editDate).format("Do MMMM YYYY")}</span>       
                          ) 
                        }
                      </p>
                      <p>
                        {
                        !articles[key].editDate && (
                          <span>
                            
                            <strong>Créé le : </strong> {moment(articles[key].date).format(
                              "Do MMMM YYYY"
                            )}
                          </span>
                        )}
                      </p>  
                
                      <p>
                        <Button
                          onClick={() => {
                            this.handleClick(articles[key].id);
                          }}
                        >
                          Voir l'article{" "}
                        </Button>
                      </p>

                  
                </Card>
                
               
              </Col>
            ))}
        </Row>
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
  onSetUsers: users => dispatch({ type: "USERS_SET", users })
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);

/*for (let key in users) {
        if (users.hasOwnProperty(key)) {           
            console.log(key, users[key].username);
        }
      } */
