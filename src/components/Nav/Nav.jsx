import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LogOutButton from '../LogOutButton/LogOutButton';

import './Nav.css';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Sniffer</h2>
      </Link>
      <div>
        {!user.id && (
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {user.id && (
          <>
            <Link className="navLink" to="/pets">
              My Pets
            </Link>
            <Link className="navLink" to="/search">
              Search
            </Link>
            <Link className="navLink" to="/compare">
              Compare
            </Link>
          </>
        )}

        {user.authLevel === 'ADMIN' && (
          <>
            <Link className="navLink" to="/admin">
              Admin Portal
            </Link>
          </>
        )}

        {user.id && (
          <>
            <LogOutButton className="navLink" />
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
