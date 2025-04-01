export const setAgreement = (isAgreed) => ({
  type: 'SET_AGREEMENT',
  payload: isAgreed
});

export const showAgreement = () => ({
  type: 'SHOW_AGREEMENT',
  payload: true
});

export const hideAgreement = () => ({
  type: 'HIDE_AGREEMENT',
  payload: false
});

export const setAuth = (isAuthenticated, user) => ({
  type: 'SET_AUTH',
  payload: { isAuthenticated, user }
});

export const setPKCEParams = (codeVerifier, codeChallenge, authState) => ({
  type: 'SET_PKCE_PARAMS',
  payload: { codeVerifier, codeChallenge, authState }
});

export const setAccessToken = (token) => ({
  type: 'SET_ACCESS_TOKEN',
  payload: token
});

export const registerUser = (user) => ({
  type: 'REGISTER_USER',
  payload: user
}); 