import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Landing from './components/layout/Landing';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import './App.css';
import setAuthToken from './utils/setAuthToken';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import DashBoard from './components/dashboard/DashBoard';
import CreateProfile from './components/profile-forms/CreateProfile';
import AddExperience from './components/profile-forms/AddExperience';
import EditProfile from './components/profile-forms/EditProfile';
import AddEducation from './components/profile-forms/AddEducation';
import Experience from './components/dashboard/Experience';
import Education from './components/dashboard/Education';
import Profiles from './components/profiles/Profiles';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import PrivateRoute from './components/routing/PrivateRoute';
import Profile from './components/profile/Profile';
import { NotFound } from './components/layout/NotFound';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [])
  return (
    <Fragment>
      <Provider store={store}>
        <Router>
          <NavBar />
            <Alert />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route path="profiles" element={<Profiles />} />
              <Route path="profile/:id" element={<Profile />} />
              <Route path="dashboard" element={<PrivateRoute component={DashBoard} />} />
              <Route path="create-profile" element={<PrivateRoute component={CreateProfile} />} />
              <Route path="edit-profile" element={<PrivateRoute component={EditProfile} />} /> 
              <Route path="add-experience" element={<PrivateRoute component={AddExperience} />} />
              <Route path="add-education" element={<PrivateRoute component={AddEducation} />} />
              <Route path="experience" element={<PrivateRoute component={Experience} />} />
              <Route path="education" element={<PrivateRoute component={Education} />} />
              <Route path="posts" element={<PrivateRoute component={Posts} />} />
              <Route path="posts/:id" element={<PrivateRoute component={Post} />} />
              <Route path="/*" element={<NotFound />} />
          </Routes>
        </Router>
      </Provider>
    </Fragment>
  )
}

export default App;
