import React from "react";

import Navigation from "../Navigation";
import Bottom from "../Bottom";

import { Container, Row, Col } from "react-materialize";

import about_us from "../../assets/images/about_us.jpg";
import university from "../../assets/images/university.jpg";

const AProposPage = ({ authUser }) => (
  <div>
    <Navigation />
    <div className="parallax-container">
      <div className="center-align">
        <Row>
          <h1 className="home-h1-title bold title-parallax-without-elements">
            À propos de nous
          </h1>
        </Row>
      </div>
      <div className="parallax">
        <img src={about_us} />
      </div>
    </div>
    <Container>
      <Row className="m-5">
        <Col s={12} m={12} l={6}>
          <p className="text">
            Ce projet a été réalisé dans le cadre de la matière "Interface web".
            Nous sommes les clients de{" "}
            <span className="bold">DECAYEUX Florian</span> et{" "}
            <span className="bold">VACANDARD Clément</span>.
          </p>
          <p className="text">
            Il s’agit de réaliser un site ayant pour but de permettre aux
            utilisateurs de partager des idées au sein d’une communauté afin de
            développer ces idées et de permettre de recueillir des avis, des
            conseils, et de rentrer en contact avec d’autres utilisateurs
            intéressés.
          </p>
        </Col>
        <Col s={12} m={12} l={6}>
          <img className="responsive-img" src={university} />
        </Col>
      </Row>
      <Row className="m-5">
        <Col s={12} m={12} l={12}>
          <p className="text text-center bold">
            JEANPIERRE Thibault - BOIVIN Jérémy
          </p>
        </Col>
      </Row>
    </Container>
    <Bottom />
  </div>
);

export default AProposPage;
