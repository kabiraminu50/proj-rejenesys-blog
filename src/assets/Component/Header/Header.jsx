import React, { useEffect, useState } from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../imgs/ramsa.jpg";

function Header() {
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedin(!!localStorage.getItem("token"));
    };

    window.addEventListener('authChange', handleAuthChange);
    return () => window.removeEventListener('authChange', handleAuthChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedin(false);
    window.dispatchEvent(new Event('authChange'));
    navigate('/login');
  };

  return (
    <div className='header-con'>
     

      <div className="nav-links">
        {!isLoggedin ? (
          <>
           <div className="logo">
        <img 
          src={logo} 
          alt="web-logo" 
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "10px",
            objectFit: "cover"
          }}
        />
      </div>
           <Link to="/">Blog Posts</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <>
           <div className="logo">
        <img 
          src={logo} 
          alt="web-logo" 
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "10px",
            objectFit: "cover"
          }}
        />
      </div>
            <Link to="/">Blog Posts</Link>
            <Link to="/createnewpost">Create New Post</Link>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;