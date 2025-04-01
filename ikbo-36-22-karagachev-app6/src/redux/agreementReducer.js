const initialState = {
  isAgreed: false,
  isVisible: false,
  isAuthenticated: false,
  user: null,
  codeVerifier: null,
  codeChallenge: null,
  registeredUsers: [
    { 
      username: 'admin', 
      password: 'admin', 
      role: 'admin',
      roles: ['admin', 'user'],
      rights: ['can_view_articles', 'can_edit_articles', 'can_delete_articles'],
      verifier: 'initial_admin_verifier'
    },
    {
      username: 'user',
      password: 'user',
      role: 'user',
      roles: ['user'],
      rights: ['can_view_articles'],
      verifier: 'initial_user_verifier'
    }
  ],
  authState: null,
  accessToken: null
};

const agreementReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_AGREEMENT':
      return {
        ...state,
        isAgreed: action.payload
      };
    case 'SHOW_AGREEMENT':
      return {
        ...state,
        isVisible: true
      };
    case 'HIDE_AGREEMENT':
      return {
        ...state,
        isVisible: false
      };
    case 'SET_AUTH':
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user ? {
          ...action.payload.user,
          roles: action.payload.user.role === 'admin' 
            ? ['admin', 'user'] 
            : ['user'],
          rights: action.payload.user.role === 'admin'
            ? ['can_view_articles', 'can_edit_articles', 'can_delete_articles']
            : ['can_view_articles']
        } : null
      };
    case 'SET_PKCE_PARAMS':
      return {
        ...state,
        codeVerifier: action.payload.codeVerifier,
        codeChallenge: action.payload.codeChallenge,
        authState: action.payload.authState
      };
    case 'SET_ACCESS_TOKEN':
      return {
        ...state,
        accessToken: action.payload
      };
    default:
      return state;
  }
};

export default agreementReducer;