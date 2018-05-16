const INITIAL_STATE = {
    commentaires: {},
  };
  
  const applySetCommentaires = (state, action) => ({
    ...state,
    commentaires: action.commentaires
  });
  
  function commentairesReducer(state = INITIAL_STATE, action) {
    switch(action.type) {
      case 'COMMENTAIRES_SET' : {
        return applySetCommentaires(state, action);
      }
      default : return state;
    }
  }
  
  export default commentairesReducer;