const initialState = {
  isAgreed: false,
  isVisible: false
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
    default:
      return state;
  }
};

export default agreementReducer;