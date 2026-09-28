import { Link, useNavigate } from "react-router";
import "./AuthLayout.css";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const RegisterCard = () => {
  useDocumentTitle("Register | Project Management");

  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { register } = useAuth();

  return (
    <div className="auth-card">
      <form>
        <div className="auth-form-group">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
          />
        </div>

        <div className="auth-form-group">
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
          />
        </div>

        <div className="auth-form-group">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
          />
        </div>

        <div className="auth-form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
            }}
          >
            <option value="admin">Admin</option>
            <option value="agent">agent</option>
            <option value="customer">customer</option>
          </select>
        </div>

        {error}

        <div className="auth-modal-actions">
          <button type="button" className="auth-cancel-btn">
            Cancel
          </button>

          <button
            type="submit"
            className="auth-submit-btn"
            onClick={async (e) => {
              e.preventDefault();
              setError("");

              try {
                await register(name, email, password, role);

                navigate("/dashboard");
              } catch (error) {
                console.log(error);

                if (error instanceof Error) setError(error.message);
              }
            }}
          >
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
