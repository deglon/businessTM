import React from "react";
import ReactDOM from "react-dom";
// import reportWebVitals from './reportWebVitals';
import App from './App';

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";



ReactDOM.render(
  <React.StrictMode>
    
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// reportWebVitals();