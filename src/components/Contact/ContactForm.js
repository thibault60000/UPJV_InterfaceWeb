import React, { Component } from "react";
import * as moment from 'moment';

// Firebase
import { db } from "../../firebase";

// Routes
import * as routes from "../../constants/routes";

import { Container, Input, Button } from "react-materialize";


const updateByPropertyName = (propertyName, value) => () => ({
    [propertyName]: value
});

const INITIAL_STATE = {
    mail: '',
    message: '',
    error: null,
};

class ContactForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const {
            email,
            message,
            history
        } = this.state;

        const date = Date.now()
        
        // Création d'un utilisateur dans la base de données
        db.doCreateContactMessage(
            date,
            email,
            message
          ).then(() => {
            this.setState(() => ({
                ...INITIAL_STATE
            }));
            history.push(routes.LANDING);
        })
        .catch(error => {
            this.setState(updateByPropertyName("error", error));
        });
        event.preventDefault();
    };

    render() {
        const { error } = this.state;
        return (
            <Container>
                { error && <p s={12} m={12} l={12} className="error">{error.message}</p> }
                <form onSubmit={this.onSubmit}>
                    <Input
                        type="email"
                        id="mail"
                        label="Adresse e-mail"
                        placeholder="Renseignez votre adresse mail"
                        s={12}
                        m={12}
                        l={12}
                        
                        onChange={ event => this.setState(updateByPropertyName("mail", event.target.value)) }
                    />
                    <Input
                        s={12}
                        m={12}
                        l={12}
                        label="Message"
                        placeholder="Entrez votre message ici..."
                        type="textarea"
                        id="message"
                        onChange={ event => this.setState(updateByPropertyName("message", event.target.value)) }
                    />
                    <Button
                        s={12}
                        m={12}
                        l={12}
                        waves="light"
                        type="submit"
                    >
                        Envoyer
                    </Button>
                </form>
        </Container>
        );
  }
}

export default ContactForm;
