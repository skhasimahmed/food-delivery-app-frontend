import { Link } from "react-router-dom";
import "./NotFound.css";
const NotFound = () => {
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
        <Link to="/">Back to homepage</Link>
      </div>
    </div>
  );
};

export default NotFound;
