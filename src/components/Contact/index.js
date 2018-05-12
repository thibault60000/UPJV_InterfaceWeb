import React from 'react';

import Navigation from '../Navigation';
import Bottom from '../Bottom';
import ContactForm from './ContactForm';

import { Container, Col, Row } from 'react-materialize';

import image3 from '../../assets/images/background3.jpg';

const ContactPage = () =>
  <div>
    <Navigation />
    <div className="parallax-container">
      <div className="center-align">
          <Row>
            <h1 className="home-h1-title bold title-parallax-without-elements">Prenez contact avec nous</h1>
          </Row>
      </div>
      <div className="parallax">
        <img src={image3}/>
      </div>
    </div>
    <Container>
    <Row className="m-5 center-align">
        <Col s={12} m={12} l={12}>
          <ContactForm />
        </Col>
    </Row>
    </Container>
    <Bottom />
  </div>


export default ContactPage;
