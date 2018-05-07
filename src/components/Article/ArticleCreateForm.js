import React, { Component } from "react";

// Firebase
import { db } from "../../firebase";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";

// Routes
import * as routes from "../../constants/routes";

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  user: "",
  id: "",
  title: "",
  date: "",
  description: "",
  comments: {},
  likes: null,
  error: null,
  user: ""
};

class ArticleCreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
      avatar: "",
      isUploading: "",
      progress: 0,
      avatarUrl: ""
    };
  }

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("images/articles")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ avatarURL: url }));
  };

  onSubmit = event => {
    const { title, description, avatar } = this.state;
    const { history, authUser } = this.props;
    const id = authUser.uid + Date.now();
    const date = Date.now();
    const comments = {};
    const likes = 0;
    const username = authUser.email;

    // Création d'un utilisateur dans la base de données
    db
      .doCreateArticle(
        authUser.uid,
        id,
        title,
        date,
        description,
        comments,
        likes,
        username,
        avatar
      )
      .then(() => {
        this.setState(() => ({
          ...INITIAL_STATE,
          avatar: "",
          isUploading: "",
          progress: 0,
          avatarUrl: ""
        }));
        history.push(routes.ARTICLE);
      })
      .catch(error => {
        this.setState(updateByPropertyName("error", error));
      });

    event.preventDefault();
  };

  render() {
    const { title, description, error } = this.state;
    const isInvalid =
      title === "" || description === "" || this.state.progress !== 100;

    return (
      <form onSubmit={this.onSubmit}>
        <p>
          <label>
            {this.state.isUploading && (
              <span> Progression: {this.state.progress} </span>
            )}
            {this.state.avatarURL && <img src={this.state.avatarURL} />}
            Avatar Img
            <FileUploader
              accept="image/*"
              name="avatar"
              randomizeFilename
              storageRef={firebase.storage().ref("images/articles")}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
            />
          </label>
        </p>
        <p>
          <label forhtml="titleArticle">Titre de l'article</label>
          <input
            value={title}
            id="titleARticle"
            onChange={event =>
              this.setState(updateByPropertyName("title", event.target.value))
            }
            type="text"
            placeholder="Titre"
          />
        </p>
        <p>
          <label forhtml="descArticle">Titre de l'article</label>
          <textarea
            id="descArticle"
            value={description}
            onChange={event =>
              this.setState(
                updateByPropertyName("description", event.target.value)
              )
            }
            placeholder="Description"
          />
        </p>

        <button disabled={isInvalid} type="submit">
          Créer
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default ArticleCreateForm;
