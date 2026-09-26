import { Link } from "react-router";
import "./AuthLayout.css";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const RegisterCard = () => {
  useDocumentTitle("Register | Project Management");

  return (
    <div className="auth-card">
      <form>
        <div className="auth-form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
          />
        </div>

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

        <div className="auth-form-group">
          <label htmlFor="role">Role</label>
          <select id="role" name="role">
            <option value="admin">Admin</option>
            <option value="agent">agent</option>
            <option value="customer">customer</option>
          </select>
        </div>

        <div className="auth-modal-actions">
          <button type="button" className="auth-cancel-btn">
            Cancel
          </button>

          <button type="submit" className="auth-submit-btn">
            Register
          </button>
        </div>
      </form>
      <div>
        <Link to="/login">already have an account ?</Link>
      </div>
    </div>
  );
};

export default RegisterCard;
