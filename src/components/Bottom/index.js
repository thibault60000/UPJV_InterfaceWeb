import React from 'react';

import * as routes from '../../constants/routes';

import { Footer } from 'react-materialize'

const Bottom = () =>
    <Footer copyrights="&copy; 2018 Copyright IdeaBook"
        moreLinks={
        <a className="grey-text text-lighten-4 right" href="https://www.u-picardie.fr/">Université de Picardie Jules Vernes</a>
        }
        links={
        <ul>
            <li><a className="text-uppercase grey-text text-lighten-3" href={routes.CONTACT}>Contact</a></li>
            <li><a className="text-uppercase grey-text text-lighten-3" href={routes.A_PROPOS}>à propos</a></li>
            <li><a className="text-uppercase grey-text text-lighten-3" href={routes.LANDING}>Accueil</a></li>
            <li><a className="text-uppercase grey-text text-lighten-3" href={routes.SIGN_UP}>Inscription</a></li>
        </ul>
        }
        className='example'
        >
        <h5 className="white-text">Merci d'avoir visité Idea'Book !</h5>
        <p className="grey-text text-lighten-4">Vous pouvez utiliser les différents liens ci-contre où la navigation pour vous déplacez sur le site</p>
    </Footer>;

export default Bottom;