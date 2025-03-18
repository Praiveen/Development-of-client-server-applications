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