import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Registartion from '../Features/Registration/Registration';

import Header from '../Features/Header/Header';
import WishList from '../Features/WishList/WishList';
import FriendsList from '../Features/FriendsList/FriendsList';
import GroupsList from '../Features/GroupsList/GroupsList';

import Profile from '../Features/Profile/Profile';
import Main from '../Features/Main/Main';

import Layout from '../Features/Layout/Layout';
import AntiWishList from '../Features/AntiWishList/AntiWishList';

function App():JSX.Element {
  return (

<Routes>
  <Route element={<Layout />}>
      <Route path="/" element={<Main />} />
      <Route path="/mywishes" element={<WishList />} />
      <Route path="/antiwishlist" element={<AntiWishList />} />
      <Route path="/myfriends" element={<FriendsList />} />
      <Route path="/mygroups" element={<GroupsList />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="auth/registration" element={<Registartion />} />
  </Route>
</Routes>

  );
}

export default App;
