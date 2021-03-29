import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LogOutButton from '../LogOutButton/LogOutButton';

import { Grid } from '@material-ui/core';

import './Nav.css';

function Nav() {
  const user = useSelector((store) => store.user.userInfo);

  return (
    <header className="nav">
      <Grid container alignItems="center" justify="space-between">
        <Grid item xs={8}>
          <Link to="/home">
            <img
              src="https://i.ibb.co/3NSGtJM/Sniffer-logowhite.png"
              alt="Sniffer logo"
              id="logo"
            />
            <h1 className="nav-title">sniffer</h1>
          </Link>
        </Grid>

        <Grid item xs={4}>
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

          {!user.id && (
            <Link className="navLink" to="/login">
              Login / Register
            </Link>
          )}

          {user.id && (
            <>
              <LogOutButton className="navLink" />
            </>
          )}
        </Grid>
      </Grid>
    </header>
  );
}

export default Nav;
