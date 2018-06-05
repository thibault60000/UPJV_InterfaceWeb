import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email, statut, name, lastname) =>
  db.ref(`users/${id}`).set({
    username,
    email,
    statut,
    name,
    lastname
  });

export const updateUser = (id, email, statut, name, lastname) =>
  db.ref(`users/${id}`).update({
    email,
    statut,
    name,
    lastname
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

/* AJOUTER UN ARTICLE DANS LA LISTE DES ARTICLES PARTICIPES D'UN UTILISATEUR */
export const addParticipatedArticleToUser = (id, idArticle) => 
  db.ref(`users/${id}/participatedArticles`).child(`${idArticle}`).set(idArticle);

/* SUPPRIME UN ARTICLE DANS LA LISTE DES ARTICLES PARTICIPES D'UN UTILISATEUR */
export const removeParticipatedArticleToUser = (id, idArticle) => 
  db.ref(`users/${id}/participatedArticles`).child(`${idArticle}`).remove();

/* RECUPERER TOUT LES ARTICLES */
export const onceGetArticles = () => 
  db.ref('articles').once('value');

/* CREATION D'UN ARTICLE */
export const doCreateArticle = (user, id, title, date, description, comments, likes, username, isPublic, keywords, limite, theme, actualLimite) => 
  db.ref(`articles/${id}`).set({
    user,
    id,
    title,
    date,
    description,
    comments,
    likes,
    username, 
    isPublic,
    keywords,
    limite,
    theme,
    actualLimite
  });

  /* GET UN ARTICLE AVEC ID */
export const onceGetOneArticle = (id) =>
  db.ref(`articles/${id}`).once('value');

  /* GET DES ARTICLES D'UN USER */
export const onceGetOneArticleUser = (user) =>
  db.ref('articles').orderByChild('user').equalTo(`${user}`);

  /* SUPPRIMER UN ARTICLE */
export const removeArticle = (id) => {
  db.ref('articles').child(id).remove();
}

  /* SUPPRIMER UN COMMENTAIRE */
  export const removeCommentaire = (id) => {
    db.ref('commentaires').child(id).remove();
  }
  
/* METTRE A JOUR UN ARTICLE */
export const updateArticle = (id, title, description, editDate, keywords, limite, theme, isPublic) => 
  db.ref(`articles/${id}`).update({
    title,
    description,
    editDate,
    keywords,
    limite,
    theme,
    isPublic
  })

  /* INCREMENTER NOMBRE PARTICIPANT D'UN ARTICLE */
  export const incrementeArticleLimite = (id, actualLimite) => 
  db.ref(`articles/${id}`).update({
    actualLimite
  }) 

  /* DECREMENTER NOMBRE PARTICIPANT D'UN ARTICLE */
  export const decrementeArticleLimite = (id, actualLimite) => 
  db.ref(`articles/${id}`).update({
    actualLimite
  }) 

    /* DECREMENTER NOMBRE DE COMMENTAIRE D'UN ARTICLE */
    export const decrementeArticleCommentaire = (id, comments) => 
    db.ref(`articles/${id}`).update({
      comments
    }) 
  

/* METTRE A JOUR UN COMMENTAIRE */
  export const updateArticleComments = (id, comments) => 
  db.ref(`articles/${id}`).update({
    comments
  })


/* COMMENTAIRES API */
export const doCreateCommentaire = (user, id, date, content, username, articleID) => 
  db.ref(`commentaires/${id}`).set({
    user,
    id,
    date,
    content,
    username,
    articleID
  });

export const onceGetCommentaires = () => 
  db.ref('commentaires').once('value');

export const onceGetCommentaireId = (id) =>
  db.ref('commentaires').orderByChild('articleID').equalTo(`${id}`);
   
// Contact messages
export const doCreateContactMessage = (id, email, message) => 
  db.ref(`contact/${id}`).set({
    id,
    email,
    message
  });
