import "./AuthLayout.css";

const LoginCard = () => {
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
    </div>
  );
};

export default LoginCard;
