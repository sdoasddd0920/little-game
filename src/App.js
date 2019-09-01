import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';
import SignUp from './pages/signUp';
import Home from './pages/home';
console.log('deploy test');

function App() {
  return (
    <Router>
      <Route path='/' exact component={Home} />
      <Route path='/signup/:id' component={SignUp} />
    </Router>
    // <div>
    //   <SignUp />
    // </div>
  );
}

export default App;
