import React from 'react';
import {BrowserRouter as Router, Routes, Route, Redirect} from 'react-router-dom';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';
import MyFamilyTree from '../balkan/MyFamilyTree';

const RoutesList = (props) => {
  return (
    <Router>
        <Routes>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/' element={<MyFamilyTree />} />
        </Routes>
      </Router>
  );
};

export default RoutesList;
