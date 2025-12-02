const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleClick = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  return (
    <nav className="navbar">
      <h1>Job Search</h1>

      <div className="links">
        <a href="/">Home</a>
        {isAuthenticated && <a href="/add-job">Add Job</a>}

        {isAuthenticated ? (
          <>
            {user && (
              <span style={{ marginLeft: "15px", fontWeight: "bold" }}>
                Logged in as: {user.email}
              </span>
            )}
            <button onClick={handleClick} style={{ marginLeft: "15px" }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <a href="/login">Login</a>
            <a href="/signup" style={{ marginLeft: "15px" }}>
              Signup
            </a>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;