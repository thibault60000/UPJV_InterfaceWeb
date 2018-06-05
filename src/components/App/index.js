import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import ArticlePage from '../Article';
import PasswordForgetPage from '../PasswordForget';
import AccountPage from '../Account';
import OneArticlePage from '../OneArticle';
import ContactPage from '../Contact';
import AProposPage from "../Apropos";
import MyArticle from "../myArticle";

import * as routes from '../../constants/routes';
import { withRouter } from 'react-router-dom';

const App = ({ history }) => {
  return (
    <Switch>
          <Route exact path={routes.LANDING} component={() => <LandingPage />} />
          <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
          <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
          <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
          <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
          <Route exact path={routes.ARTICLE} component={() => <ArticlePage/>} />
          <Route exact path={routes.ONE_ARTICLE} component={() => <OneArticlePage/>} />
          <Route exact path={routes.CONTACT} component={() => <ContactPage/>} />
          <Route exact path={routes.A_PROPOS} component={() => <AProposPage/>} />
          <Route exact path={routes.MY_ARTICLES} component={() => <MyArticle/>} />
    </Switch>
  )
}


export default withRouter(App);
