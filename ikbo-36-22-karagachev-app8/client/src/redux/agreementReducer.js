const initialState = {
  isAgreed: false,
  isVisible: false,
  isAuthenticated: false,
  user: null,
  token: null
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
          id: action.payload.user.id
        } : null,
        token: action.payload.user?.token || null
      };
    default:
      return state;
  }
};

export default agreementReducer;