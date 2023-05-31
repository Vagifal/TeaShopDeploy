import { BrowserRouter as Router } from 'react-router-dom';

import { DataProvider } from './MainState';
import Header from './components/header/Header';
import Pages from './components/pages/Pages';
import './App.css';

const App = () => {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <Pages />
        </div>
      </Router>
    </DataProvider>
  );
};

export default App;
