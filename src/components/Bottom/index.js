import React from 'react';

import {Col, Footer} from 'react-materialize'

const Bottom = () =>
    <Footer copyrights="&copy; 2018 Copyright IdeaBook"
        moreLinks={
        <a className="grey-text text-lighten-4 right" href="#!">Université de Picardie Jules Vernes</a>
        }
        links={
        <ul>
            <li><a className="grey-text text-lighten-3" href="#!">Contact</a></li>
            <li><a className="grey-text text-lighten-3" href="#!">A Propos</a></li>
            <li><a className="grey-text text-lighten-3" href="#!">Accueil</a></li>
            <li><a className="grey-text text-lighten-3" href="#!">Inscription</a></li>
        </ul>
        }
        className='example'
        >
        <h5 className="white-text">Merci d'avoir visité Idea'Book !</h5>
        <p className="grey-text text-lighten-4">Vous pouvez utiliser les différents liens ci-contre où la navigation pour vous déplacez sur le site</p>
    </Footer>;

export default Bottom;