import React from 'react';
import Routes from './routes';
import './styles.css';

import Header from './components/Header';

const App = () => {
  return (
    <div>
      <Header/>
      <Routes/>
    </div>
  );
}

export default App;
