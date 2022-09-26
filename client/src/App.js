import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { RequireAuth } from './auth/RequireAuth';
import Home from './pages/Home';
import Header from './components/Header';
import NoMatch from './pages/NoMatch';
import Dashboard from './pages/Dashboard';
import Report from './pages/Report'

const App = () => {
  return (
    <>
    <Header />
    <Routes>
      <Route
        path='/'
        element={<Home />} />
      <Route
        path='/report/:siteNumber'
        element={<Report />} />
      <Route
        path='/dashboard'
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route path='*' element={<NoMatch />} />
    </Routes>
    </>
  );
};

export default App;
