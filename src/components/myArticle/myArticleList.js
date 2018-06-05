import React, { Component } from "react";

// Routes
import * as routes from "../../constants/routes";

// Moment.JS
import * as moment from "moment";
import "moment/locale/fr";

// Materialize
import { Collection, CollectionItem, Badge, Col } from "react-materialize";

class MyArticleList extends Component {
  handleClick(id) {
    this.props.history.push(`article/${id}`);
  }

  getArticleURI(id) {
    return routes.ARTICLE + "/" + id;
  }

  render() {
    const { articles } = this.props;

    moment.locale("fr");
    return (
      <div>
        <h2 className="article-title h2-title text-left">
          Voici la liste de vos idées
        </h2>

        <p> Cliquez sur un article pour le consulter et le modifier</p>

        <div className="redBox">
          <span className="box" /> <span className="text">Non Publique</span>
        </div>
        <div className="greenBox">
          <span className="box" /> <span className="text">Publique</span>
        </div>

        
        { articles && 
          <Col s={12} m={12} l={12}>
            <Collection>
              {Object.keys(articles)
                .sort()
                .reverse()
                .map(key => (
                  <CollectionItem href={this.getArticleURI(articles[key].id)}>
                    {articles[key].isPublic === true && (
                      <div>
                        <span>
                          Idée {" "}{" "} 
                          <span className="bold text-uppercase">
                          {" "} {articles[key].title && articles[key].title}
                          </span>
                          {" "}{" "}  {" | "} {" "}{" "}  Thème : {" "} 
                          <span className="bold text-uppercase">
                          {" "} {articles[key].theme && articles[key].theme}
                          </span>
                        </span>

                        <Badge newIcon data-badge-caption="">
                          Publiée le{" "}
                          {articles[key].date &&
                            moment(articles[key].date).format("Do MMMM YYYY")}
                        </Badge>
                      </div>
                    )}

                    { articles[key].isPublic === false && (
                      <div className="isntPublic">
                        <span>
                          Idée {" "}{" "} 
                          <span className="bold text-uppercase">
                          {" "} {articles[key].title && articles[key].title}
                          </span>
                          {" "}{" "}  {" | "} {" "}{" "}  Thème : {" "} 
                          <span className="bold text-uppercase">
                          {" "} {articles[key].theme && articles[key].theme}
                          </span>
                        </span>


                        <Badge newIcon data-badge-caption="">
                          Publiée le{" "}
                          {articles[key].date &&
                            moment(articles[key].date).format("Do MMMM YYYY")}
                        </Badge>
                      </div>
                    )}
                  </CollectionItem>
                ))}
            </Collection>
          </Col>
        }

                <p className="text-justify"> Une fois mis en ligne, votre projet peut être suivi par la communauté jusqu'à la limite indiquée lors de la création de celui-ci. Il vous sera alors possible de le rendre "non publique" lorsque bon vous semble. </p>
                <p className="text-justify"> Les messages restent disponible accessibles même après la "dé-publication" temporaire de votre projet. </p>
                <p className="text-justify"> Si un ou plusieurs messages vous semble injurieux, hors sujet ou que vous êtes en présence de spam, vous pouvez à tout moment signaler ce message et le service administration prendra le relais.</p>

      </div>
    );
  }
}

export default MyArticleList;
