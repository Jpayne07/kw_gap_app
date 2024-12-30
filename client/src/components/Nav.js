import { NavLink } from 'react-router-dom';

function Nav({ user, setUser }) {
  // Handle logout action
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null); // Clear the user state on successful logout
      }
    });
  }

  return (
    <div>
      <nav
        style={{
          padding: '20px',
          display: 'flex',
          justifyContent: 'center',  // Center the content horizontally
          alignItems: 'center',      // Align items vertically
          fontSize: '20px',
          backgroundColor: '#FF5733',
          borderBottom: '2px solid #ddd',
        }}
      >
        <NavLink
          to="/"
          style={{
            margin: '0 15px',
            textAlign: 'center',
          }}
          activeStyle={{
            fontWeight: 'bold',
            color: '#007BFF',
          }}
        >
          Home
        </NavLink>
        <NavLink
          to="/projects"
          style={{
            margin: '0 15px',
            textAlign: 'center',
          }}
          activeStyle={{
            fontWeight: 'bold',
            color: '#007BFF',
          }}
        >
          Projects
        </NavLink>
        {user ? (
          <button
            onClick={handleLogoutClick}
            style={{
              padding: '5px 10px',
              marginLeft: '20px',
              backgroundColor: '#fff',
              color: '#581845',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        ) : (
          <NavLink
            to="/login"
            style={{
              padding: '5px 10px',
              marginLeft: '20px',
              backgroundColor: '#FF5733',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '5px',
            }}
          >
            Login
          </NavLink>
        )}
      </nav>
    </div>
  );
}

export default Nav;
