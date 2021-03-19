import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

import MyPetsPage from '../MyPetsPage/MyPetsPage';
import SearchPage from '../SearchPage/SearchPage';
import ComparisonTool from '../ComparisonTool/ComparisonTool';
import PetDetailPage from '../PetDetailPage/PetDetailPage';
import AddPetPage from '../AddPetPage/AddPetPage';

import AdminPortal from '../Admin/AdminPortal/AdminPortal';
import AdminFoods from '../Admin/AdminFoods/AdminFoods';
import AdminAllergies from '../Admin/AdminAllergies/AdminAllergies';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user.userInfo);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          <Route exact path="/home">
            <LandingPage />
          </Route>

          <ProtectedRoute exact path="/login" authRedirect="/home">
            <LoginPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/registration" authRedirect="/home">
            <RegisterPage />
          </ProtectedRoute>

          {/*** PAGES ***/}
          <ProtectedRoute exact path="/pets">
            <MyPetsPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/search">
            <SearchPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/compare">
            <ComparisonTool />
          </ProtectedRoute>

          <Route path="/pets/:id" exact>
            <PetDetailPage />
          </Route>

          <ProtectedRoute exact path="/addapet">
            <AddPetPage />
          </ProtectedRoute>

          {/*** ADMIN ROUTES ***/}
          {user.authLevel === 'ADMIN' && (
            <>
              <ProtectedRoute exact path="/admin">
                <AdminPortal />
              </ProtectedRoute>

              <ProtectedRoute exact path="/admin/food">
                <AdminFoods />
              </ProtectedRoute>

              <ProtectedRoute exact path="/admin/allergy">
                <AdminAllergies />
              </ProtectedRoute>
            </>
          )}

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
            <p>Page not found.</p>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
