const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="navbar">
      <h1>Job Search</h1>

      <div className="links">
        <a href="/">Home</a>
        <a href="/add-job">Add Job</a>

        {user && (
          <span style={{ marginLeft: "15px", fontWeight: "bold" }}>
            Logged in as: {user.email}
          </span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
