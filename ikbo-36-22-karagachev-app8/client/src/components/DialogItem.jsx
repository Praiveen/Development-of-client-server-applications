import { Link } from 'react-router-dom';

const DialogItem = (props) => {
  let path = "/dialogs/" + props.id;
  return (
    <div>
      <Link to={path}>{props.name}</Link>
    </div>
  );
}

export default DialogItem; 