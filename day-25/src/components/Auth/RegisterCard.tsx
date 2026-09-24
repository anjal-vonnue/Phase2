import "./AuthLayout.css";

const RegisterCard = () => {
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
          <label htmlFor="status">Status</label>
          <select id="status" name="status">
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolve">Resolve</option>
            <option value="closed">Closed</option>
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
    </div>
  );
};

export default RegisterCard;
