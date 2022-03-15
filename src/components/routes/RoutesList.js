import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';
import MyFamilyTree from '../balkan/MyFamilyTree';
import Lp from '../lp/Lp';


const RoutesList = (props) => {
  return (
    <Router>
        <Routes>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/map' element={<MyFamilyTree />} />
          <Route path='/' element={<Lp />} />
        </Routes>
      </Router>
  );
};

export default RoutesList;
