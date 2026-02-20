import React from 'react';
import { FeedbackPage } from './pages/FeedbackPage';
import { AdminPage } from './pages/AdminPage';

function App() {
  // Simple routing - you can replace with react-router if needed
  const path = window.location.pathname;

  return (
    <div className="App">
      {path === '/admin' ? <AdminPage /> : <FeedbackPage />}
    </div>
  );
}

export default App;