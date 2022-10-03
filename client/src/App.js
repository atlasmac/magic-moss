import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { RequireAuth } from './auth/RequireAuth';
import Home from './pages/Home';
import Header from './components/Header';
import NoMatch from './pages/NoMatch';
import Dashboard from './pages/Dashboard';
import Report from './pages/Report'

const App = () => {
  const [showLogin, setShowLogin] = React.useState(false)
  const [showSignUp, setShowSignUp] = React.useState(false)
  return (
    <>
      <Header
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        showSignUp={showSignUp}
        setShowSignUp={setShowSignUp}
      />
      <Routes>
        <Route
          path='/'
          element={
            <Home
            showLogin={showLogin}
            setShowLogin={setShowLogin}
            showSignUp={showSignUp}
            setShowSignUp={setShowSignUp}
            />
          } />
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
