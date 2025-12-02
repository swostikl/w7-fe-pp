import useField from "../hooks/useField";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const email = useField("email");
  const password = useField("password");

  const { login, error } = useLogin("/api/users/login");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    await login({
      email: email.value,
      password: password.value,
    });

    if (!error) {
      console.log("Login success");
      setIsAuthenticated(true); // Update authentication state
      navigate("/");
    }
  };

  return (
    <div className="create">
      <h2>Log In</h2>

      <form onSubmit={handleFormSubmit}>
        <label>Email:</label>
        <input {...email} required />

        <label>Password:</label>
        <input {...password} required />

        <button>Log In</button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;

// Note: Consider using HTTP-only cookies for storing authentication tokens instead of localStorage for better security.
