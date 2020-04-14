import React from 'react';
import {useSelector} from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";
import Posts from "./containers/Posts/Posts";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import NewPost from "./containers/NewPost/NewPost";
import ProductPage from "./containers/PostPage/PostPage";
import UserProfileForm from "./components/UI/Form/UserProfileForm";
import UserProfile from './containers/UserProfile/UserProfile';

const ProtectedRoute = ({isAllowed, ...props}) => (
  isAllowed ? <Route {...props}/> : <Redirect to="/login"/>
);

const Routes = () => {
  const user = useSelector(state => state.users.user);

  return (
    <Switch>
      <ProtectedRoute isAllowed={user} path="/" exact component={Posts} />
      <Route path="/category/:id" exact component={Posts} />
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      <ProtectedRoute isAllowed={user} path="/profile/edit" exact component={UserProfileForm } />
      <ProtectedRoute isAllowed={user} path="/profile/" exact component={UserProfile } />
      <ProtectedRoute isAllowed={user} path="/posts/new" exact component={NewPost} />
      <Route path="/posts/:id" exact component={ProductPage} />
    </Switch>
  );
};

export default Routes;