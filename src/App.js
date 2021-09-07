// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Provider } from 'react-redux';
//import store from './TomatoMan/Store';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './Tomatoman/Store';
// import Phone from './Tomatoman/Phone';
import Routing from './Tomatoman/Routing';
function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <Routing />
        </div>
      </PersistGate>
    </Provider>

  );
}

export default App;
