import { Link } from 'react-router-dom';
import './NotFound.css';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
const NotFound = () => {
  const { isAdmin } = useContext(StoreContext);
  return (
    <div id="not-found">
      <div className="not-found">
        <div className="not-found-404">
          <h1>
            4<span id="zero">0</span>4
          </h1>
        </div>
        <h2>Oops! Page Not Found</h2>
        <p>
          Sorry but the page you are looking for does not exist, have been
          removed. name changed or is temporarily unavailable
        </p>
        <Link to={isAdmin ? '/admin/dashboard' : '/'}>
          Back to {isAdmin ? 'Dashboard' : 'Home'}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
