import useField from "../hooks/useField";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const email = useField("email");
  const password = useField("password");

  const { login, error } = useLogin("/api/users/login");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login({
      email: email.value,
      password: password.value,
    });

    if (!error) {
      console.log("Login success");
      navigate("/");
    }
  };

  return (
    <div className="create">
      <h2>Log In</h2>

      <form onSubmit={handleSubmit}>
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

//  Where is the token or auth info stored? Is it secure?

//The authentication information is stored in the browser’s
//localStorage, which makes it easy to access across pages.
//However, localStorage is not fully secure because JavaScript can read it,
//making it vulnerable to XSS attacks. In real-world applications, authentication
//data is usually stored in HTTP-only cookies for better security.
