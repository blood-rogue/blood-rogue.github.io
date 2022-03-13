import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from "./App"
import Loader from './Loader';

ReactDOM.render(
<React.StrictMode>
  <Loader />
  <React.Suspense fallback={<></>}>
    <App />
  </React.Suspense>
</React.StrictMode>, document.getElementById('root'));

reportWebVitals();
