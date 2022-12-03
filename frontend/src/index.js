import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import Login from './components/Login'
import {CookiesProvider} from 'react-cookie'
import MyProfile from './components/MyProfile';
import './components/Login'
import './components/MyProfile'
import "bootstrap/dist/css/bootstrap.min.css"
import { BudgetsProvider } from './components/budgetcontext';


function Router() {
  return (
    <BudgetsProvider>
    <CookiesProvider>
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />}/>
        
        <Route exact path="/myprofile" element={<MyProfile />}/>
      </Routes>
      </BrowserRouter>
    </CookiesProvider>
    </BudgetsProvider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
