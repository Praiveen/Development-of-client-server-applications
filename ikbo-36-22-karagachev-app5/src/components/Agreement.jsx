import { useSelector, useDispatch } from 'react-redux';
import { setAgreement, hideAgreement } from '../redux/actions';

function Agreement() {
  const { isAgreed, isVisible } = useSelector(state => state);
  const dispatch = useDispatch();

  const handleCheckboxChange = (e) => {
    dispatch(setAgreement(e.target.checked));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAgreed) {
      dispatch(hideAgreement());
    }
  };

  if (!isVisible) return null;

  return (
    <div className="modal">
      <div className="agreement-form">
        <h2>Пользовательское соглашение</h2>
        <form onSubmit={handleSubmit}>
          <div className="agreement-text">
            <p>
              Очень важный текст соглашения
            </p>
          </div>
          
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="agreement"
              checked={isAgreed}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="agreement">
              Я прочитал(а) и принимаю условия соглашения
            </label>
          </div>

          <button 
            type="submit" 
            disabled={!isAgreed}
            className={!isAgreed ? 'button-disabled' : ''}
          >
            Подтвердить
          </button>
        </form>
      </div>
    </div>
  );
}

export default Agreement; 