import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from "./App"
import Loader from './Loader';
import DefaultHelmet from './components/DefaultHelmet';

const Root: React.FC = () => {
  useEffect(() => {
    if (localStorage.getItem("loaded")) localStorage.removeItem("loaded")
    if (localStorage.getItem("error")) localStorage.removeItem("error")
    return () => {
      if (localStorage.getItem("loaded")) localStorage.removeItem("loaded")
      if (localStorage.getItem("error")) localStorage.removeItem("error")
    }
  })
  return (
  <React.StrictMode>
    <React.Suspense fallback={<Loader />}>
      <DefaultHelmet />
      <App />
    </React.Suspense>
  </React.StrictMode>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'));

reportWebVitals();
