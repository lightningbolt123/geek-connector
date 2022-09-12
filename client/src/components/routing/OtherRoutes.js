import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Alert from '../layout/Alert';
import DashBoard from '../dashboard/DashBoard';
import CreateProfile from '../profile-forms/CreateProfile';
import AddExperience from '../profile-forms/AddExperience';
import EditProfile from '../profile-forms/EditProfile';
import AddEducation from '../profile-forms/AddEducation';
import Experience from '../dashboard/Experience';
import Education from '../dashboard/Education';
import Profiles from '../profiles/Profiles';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import PrivateRoute from './PrivateRoute';
import Profile from '../profile/Profile';
import { NotFound } from '../layout/NotFound';


export const OtherRoutes = () => {
    return (
        <section className="container">
            <Alert />
            <Routes>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:id" component={Profile} />
              <PrivateRoute exact path="/dashboard" component={DashBoard} />
              <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              <PrivateRoute exact path="/add-experience" component={AddExperience} />
              <PrivateRoute exact path="/add-education" component={AddEducation} />
              <PrivateRoute exact path="/experience" component={Experience} />
              <PrivateRoute exact path="/education" component={Education} />
              <PrivateRoute exact path="/posts" component={Posts} />
              <PrivateRoute exact path="/posts/:id" component={Post} />
              <Route component={NotFound} />
            </Routes>
          </section>
    )
}
