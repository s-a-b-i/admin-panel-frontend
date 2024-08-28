import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Layout from './component/Layout';
import routes from './routes/routes';

function App() {
  return (
    
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.layout ? (
              <Layout>
                <route.component />
              </Layout>
            ) : (
              <route.component />
            )}
          />
        ))}
      </Routes>

  );
}

export default App;