import { Link } from "react-router";
import "./AuthLayout.css";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const LoginCard = () => {
  useDocumentTitle("Login | Project Management");
  return (
    <div className="auth-card">
      <form>
        <div className="auth-form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
          />
        </div>

        <div className="auth-form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
          />
        </div>

        <div className="auth-modal-actions">
          <button type="button" className="auth-cancel-btn">
            Cancel
          </button>

          <button type="submit" className="auth-submit-btn">
            LogIn
          </button>
        </div>
      </form>
      <div>
        <Link to="/register">don't have an account ?</Link>
      </div>
    </div>
  );
};

export default LoginCard;
