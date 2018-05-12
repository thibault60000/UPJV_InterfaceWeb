import React, { Component } from 'react';
import { connect } from 'react-redux';
import { db } from '../../firebase';
import * as routes from '../../constants/routes';

import Navigation from '../Navigation';
import SignInForm from '../SignIn';
import Bottom from '../Bottom';
import ArticleList from '../Article/ArticleList';

import image1 from '../../assets/images/background1.jpg';
import image2 from '../../assets/images/background2.jpg';
import image3 from '../../assets/images/background3.jpg';

import { Container, Parallax, Button, Modal, Icon, Row, Col } from 'react-materialize'

class LandingPage extends Component {
    componentDidMount() {
      const { onSetUsers } = this.props;
      const { onSetArticles } = this.props;
  
      db.onceGetUsers().then(snapshot =>
        onSetUsers(snapshot.val())
      );
      db.onceGetArticles().then(snapshot => 
        onSetArticles(snapshot.val())
      );
    }
  
    render() {
        const { articles } = this.props;
        const { authUser } = this.props;
        return (
            <section>
                <Navigation />
                { authUser
                    ? (
                        <span>
                            <div className="parallax-container">
                                <div className="center-align">
                                    <Row>
                                        <h1 className="home-h1-title bold title-parallax-connected-with-elements">Êtes-vous prêts ?</h1>
                                    </Row>
                                </div>
                                <div className="valign-wrapper center-align">
                                    <Row>
                                        <a className="btn" href={routes.ARTICLE}>Créer une idée</a>
                                    </Row>
                                </div>
                                <div className="parallax">
                                    <img src={image3} />
                                </div>
                            </div>
                            <Container>
                                <h2 className="h2-title home-project-title">Les derniers projets <em>du moment</em></h2>
                                { !!articles && <ArticleList />}
                                { !articles && <p>Dommage, il n'y a pas d'articles</p>}
                            </Container>
                        </span>
                    ) : (
                        <span>
                            <div className="parallax-container">
                                <div className="center-align">
                                    <Row>
                                        <h1 className="home-h1-title text-uppercase bold title-parallax-disconnected-with-elements">Bienvenue</h1>
                                    </Row>
                                </div>
                                <div className="center-align">
                                    <Row>
                                        <h2 className="home-h2-title title-parallax-disconnected-with-elements">Sur notre site de partage d'idées</h2>
                                    </Row>
                                </div>
                                <div className="valign-wrapper center-align">
                                    <Container>
                                        <Row>
                                            <Modal
                                                header='Connexion'
                                                trigger={<Button waves='light'>Se connecter</Button>}>
                                                <SignInForm />
                                            </Modal>
                                        </Row>
                                    </Container>
                                </div>
                                <div className="parallax">
                                    <img src={image1}/>
                                </div>
                            </div>
                            <section className="container" id="home-section">
                                <Row className="center-align">
                                    <Col s={12} m={4} l={4}>
                                        <Icon medium center className="home-icon">chat_bubble</Icon>
                                        <h2 className="h2-title home-title">Discussion</h2>
                                        <p className="text">
                                            Elit voluptate deserunt ut dolore incididunt occaecat nostrud ea consequat sint eu. Elit voluptate deserunt ut dolore incididunt occaecat nostrud ea consequat sint eu.
                                        </p>
                                    </Col>
                                    <Col s={12} m={4} l={4}>
                                        <Icon medium center className="home-icon">group</Icon>
                                        <h2 className="h2-title home-title">Avis / Conseils</h2>
                                        <p className="text">
                                            Elit voluptate deserunt ut dolore incididunt occaecat nostrud ea consequat sint eu.
                                        </p>
                                    </Col>
                                    <Col s={12} m={4} l={4}>
                                        <Icon medium center className="home-icon">flag</Icon>
                                        <h2 className="h2-title home-title">Loisirs</h2>
                                        <p className="text">
                                            Elit voluptate deserunt ut dolore incididunt occaecat nostrud ea consequat sint eu.
                                        </p>
                                    </Col>
                                </Row>
                            </section>
                            <Parallax imageSrc={image2} />
                        </span>
                    )
                }
                <Bottom />
            </section>
        );
    }
}

const mapStateToProps = (state) => ({
    articles: state.articleState.articles,
    users: state.userState.users,
    authUser: state.sessionState.authUser,
});
  
const mapDispatchToProps = (dispatch) => ({
    onSetUsers: (users) => dispatch({ type: 'USERS_SET', users }),
    onSetArticles: articles => dispatch({ type: "ARTICLES_SET", articles })
});

const authCondition = (authUser) => !!authUser;

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);