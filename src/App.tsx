import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Main } from './pages/Main';
import { Statistics } from './pages/Statistics';
import { store } from './store/store';

function App() {
  return (
    <div className={'container'}>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Route exact path='/' component={Main} />
          <Route path='/statistics' component={Statistics} />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
