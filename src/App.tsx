import React from 'react';
import Layout from './views/layout/Layout';
import Cart from './views/pages/Cart';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Layout>
        <Cart />
      </Layout>
    </div>
  );
}

export default App;
