import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Grid, Dialog } from '@material-ui/core';

import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';
import LoginForm from '../LoginForm/LoginForm';

function LandingPage() {
  const history = useHistory();

  const user = useSelector((store) => store.user.userInfo);

  const [open, setOpen] = useState(false);
  const [clickedForm, setClickedForm] = useState('');

  useEffect(() => {
    if (user.id) {
      setOpen(false);
    }
  }, [user]);

  const onLogin = (event) => {
    history.push('/login');
  }; // end onLogin

  const handleOpen = (form) => {
    setClickedForm(form);
    setOpen(true);
  }; // end handleOpen

  const handleClose = () => {
    setOpen(false);
  }; // end handleClose

  return (
    <div className="container">
      <div id="coverContainer">
        <img
          src="https://images.unsplash.com/photo-1534361960057-19889db9621e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
          alt="White dog running in a field"
          id="coverImage"
        />
        <p id="copyOne">Food allergies can be ruff...</p>
        <p id="copyTwo">but they don't have to be.</p>

        <div id="infoContainer">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            id felis metus. Vestibulum et pulvinar tortor. Morbi pharetra lacus
            ut ex molestie blandit. Etiam et turpis sit amet risus mollis
            interdum. Suspendisse et justo vitae metus bibendum fringilla sed
            sed justo. Aliquam sollicitudin dapibus lectus, vitae consequat odio
            elementum eget.
          </p>
        </div>
        {!user.id && (
          <Grid container id="loginBtns" justify="space-evenly">
            <Grid item>
              <Button variant="outlined" onClick={() => handleOpen('login')}>
                Login
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" onClick={() => handleOpen('register')}>
                Register
              </Button>
            </Grid>
          </Grid>
        )}
      </div>
      <a
        href="https://unsplash.com/@joeyc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        id="photocredit"
      >
        photo © Joe Caione
      </a>

      <Dialog open={open} onClose={handleClose}>
        {clickedForm === 'register' ? <RegisterForm /> : <LoginForm />}
      </Dialog>
    </div>
  );
}

export default LandingPage;
