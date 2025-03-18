import { useParams } from 'react-router-dom';

const DialogPage = () => {
  const { id } = useParams();


  return (
    <div>
      <h1>Диалог с ID: {id}</h1>
      <p>Тут текст</p>
    </div>
  );
}

export default DialogPage; 