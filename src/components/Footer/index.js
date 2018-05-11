import React from 'react';

import {Col} from 'react-materialize'

const Footer = () =>
    <footer className="row footer">
        <div className="container">
            <Col s={12} m={12} l={6}>
                <h3 className="h3-title footer-title">Biographie</h3>
                <p className="text footer-text">
                    Dolore ea commodo adipisicing ullamco voluptate in nulla elit amet dolor tempor do id in velit excepteur non.
                </p>
            </Col>
            <Col s={12} m={12} l={3}>
                <h3 className="h3-title footer-title">Settings</h3>
                <ul>
                    <li><a className="link footer-link" href="">Link</a></li>
                    <li><a className="link footer-link" href="">Link</a></li>
                    <li><a className="link footer-link" href="">Link</a></li>
                </ul>
            </Col>
            <Col s={12} m={12} l={3}>
                <h3 className="h3-title footer-title">Connect</h3>
                <ul>
                    <li><a className="link footer-link" href="">Link</a></li>
                    <li><a className="link footer-link" href="">Link</a></li>
                    <li><a className="link footer-link" href="">Link</a></li>
                </ul>
            </Col>
        </div>
    </footer>

export default Footer;