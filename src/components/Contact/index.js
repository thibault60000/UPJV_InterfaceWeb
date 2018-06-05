import React from "react";

import Navigation from "../Navigation";
import Bottom from "../Bottom";
import ContactForm from "./ContactForm";

import { Container, Col, Row } from "react-materialize";

import contact from "../../assets/images/contact.jpg";

const ContactPage = () => (
  <div>
    <Navigation />
    <div className="parallax-container">
      <div className="center-align">
        <Row>
          <h1 className="home-h1-title bold title-parallax-without-elements">
            Prenez contact avec nous
          </h1>
        </Row>
      </div>
      <div className="parallax">
        <img src={contact} />
      </div>
    </div>
    <Container>
      <Row className="m-5 center-align">
        <Col s={12} m={12} l={12}>
          <ContactForm />
        </Col>
      </Row>
      <iframe
      className="contactCard"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d642.5005575593077!2d2.2986249792692948!3d49.89876144871266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e7843bd7f87145%3A0x8ea154a9ba8fe63b!2sFacult%C3%A9+des+Sciences!5e0!3m2!1sfr!2sfr!4v1527153209244"
      frameborder="0"
      allowfullscreen
    />
    </Container>



    <Bottom />
  </div>
);

export default ContactPage;
