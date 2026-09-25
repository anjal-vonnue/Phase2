import { useNavigate } from "react-router";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <h1>404 Page Not Found</h1>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Back to Home?
      </button>
    </div>
  );
};

export default NotFound;
