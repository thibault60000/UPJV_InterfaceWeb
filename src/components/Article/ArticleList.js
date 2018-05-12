import React, { Component } from "react";
import { connect } from "react-redux";
import { history } from "../../store";
import { Card, CardTitle, Button, Col, Row } from "react-materialize";

// Firebase
import { db } from "../../firebase";

/* Moment.js */
import * as moment from "moment";
import "moment/locale/fr";

import sampleArticle from '../../assets/images/sample-1.jpg';

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
    const { onSetUsers } = this.props;
    db.onceGetUsers().then(snapshot => onSetUsers(snapshot.val()));
  }

  render() {
    const { articles, users } = this.props;
    moment.locale("fr");

    return (
      <div>
        <Row>
          {Object.keys(articles)
            .sort()
            .reverse()
            .map(key => (
              <Col s={12} m={6} l={4}>
                <Card header={<CardTitle image={sampleArticle} >{articles[key].title}</CardTitle>} actions={[<Button floating className='btn background-brown' waves='light' icon='remove_red_eye' onClick={() => {this.handleClick(articles[key].id);}}/>]}>
                  <p>
                    <strong>Thème</strong> : {articles[key].theme}
                  </p>
                  <br/>
                  {/* <p>
                    <strong>Description</strong>
                  </p>
                  <p>
                    <em>{articles[key].description}</em>
                  </p>
                  <br/> */}
                  { 
                    users.hasOwnProperty(articles[key].user) && (
                      <p>
                          Créé par <strong>{ users[articles[key].user].username }</strong> le <strong>{ moment(articles[key].date).format("Do MMMM YYYY") }</strong>
                      </p>
                    )
                  }
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
