import React from 'react';
import ReactDOM, { render } from 'react-dom';
import './index.css';
import './index.html';
import Propdemagkharab from './Propdemagkharab';
import 'bootstrap/dist/css/bootstrap.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Rootreducer from './reducers/Rootreducer'
const store = createStore(Rootreducer);
ReactDOM.render(

  <>
    <Provider store={store}>
      <Propdemagkharab />
    </Provider>
  </>,
  document.getElementById('root')
);

// export { Addca };
// export default Chalbe;
// export {ind};