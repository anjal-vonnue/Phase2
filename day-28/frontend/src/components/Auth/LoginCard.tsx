import { Link, useNavigate } from "react-router";
import "./AuthLayout.css";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const LoginCard = () => {
  useDocumentTitle("Login | Project Management");

  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { login } = useAuth();

  return (
    <div className="auth-card">
      <form>
        <div className="auth-form-group">
          <label htmlFor="email">Email</label>
          <input
            value={email}
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div className="auth-form-group">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
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
                await login(email, password);

                navigate("/dashboard");
              } catch (error) {
                console.log(error);

                if (error instanceof Error) setError(error.message);
              }
            }}
          >
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
