import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { SnackbarAutoHideDuration } from 'utils/consts';
import Path from './routes/Path';
import Layout from './views/layout/Layout';
import Products from './views/pages/Products';
import Cart from './views/pages/Cart';
import './App.css';

// TODO: Add 404 Handling page
function App() {
  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={SnackbarAutoHideDuration}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    >
      <Router>
        <Layout>
          <Route exact path={Path.Home} component={Products} />
          <Route path={Path.Products} component={Products} />
          <Route path={Path.Cart} component={Cart} />
        </Layout>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
