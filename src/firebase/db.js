import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email, statut) =>
  db.ref(`users/${id}`).set({
    username,
    email,
    statut,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');


// Article API 

export const onceGetArticles = () => 
  db.ref('articles').once('value');

export const doCreateArticle = (user, id, title, date, description, comments, likes, username, isPublic, keywords, limite, theme) => 
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
    theme
  });

export const onceGetOneArticle = (id) =>
  db.ref(`articles/${id}`).once('value');

export const removeArticle = (id) => {
  db.ref('articles').child(id).remove();
}

export const updateArticle = (id, title, description, editDate, keywords, limite, isPublic) => 
  db.ref(`articles/${id}`).update({
    title,
    description,
    editDate,
    keywords,
    limite,
    isPublic
  })
