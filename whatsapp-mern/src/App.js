import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes'
import { createBrowserHistory } from 'history'
import './firebase'
import Context from './Context';



function App() {

  const history = createBrowserHistory();

  return (
    <Context>
      <Router history={history}>
        <Routes />
      </Router>
    </Context>
  );
}

export default App;
