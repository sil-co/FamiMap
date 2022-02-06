import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';
import MyFamilyTree from '../balkan/MyFamilyTree';

import Navbar from '../navbar/Navbar';

const RoutesList = (props) => {
  return (
    <Router>
        <Navbar />
        <Routes>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/' element={<MyFamilyTree />} />
        </Routes>
      </Router>
  );
};

export default RoutesList;
