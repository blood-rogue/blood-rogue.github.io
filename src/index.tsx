import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from "./App"
import Loader from './Loader';

const Root: React.FC = () => {
  React.useEffect(() => {
    if (localStorage.getItem("loaded")) localStorage.removeItem("loaded")
    if (localStorage.getItem("error")) localStorage.removeItem("error")
    if (localStorage.getItem("ended")) localStorage.removeItem("ended")

    return () => {
      if (localStorage.getItem("loaded")) localStorage.removeItem("loaded")
      if (localStorage.getItem("error")) localStorage.removeItem("error")
      if (localStorage.getItem("ended")) localStorage.removeItem("ended")
    }
  })

  return (
  <React.StrictMode>
    <Loader />
    <React.Suspense fallback={<></>}>
      <App />
    </React.Suspense>
  </React.StrictMode>)
}

ReactDOM.render(<Root />, document.getElementById('root'));

reportWebVitals();
