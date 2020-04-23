import React from 'react';
import Layout from './views/layout/Layout';
import Products from './views/pages/Products';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Layout>
        <Products />
      </Layout>
    </div>
  );
}

export default App;
