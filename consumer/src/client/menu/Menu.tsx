import React from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Menu = () => (
  <AppBar position="static">
    <Toolbar>
      <Button color="inherit" component={(props: any) => <Link {...props} to="/" />}>
        Home
      </Button>
      <Button color="inherit" component={(props: any) => <Link {...props} to="/news" />}>
        News
      </Button>
      <Button color="inherit" component={(props: any) => <Link {...props} to="/products" />}>
        Products
      </Button>
      <Button color="inherit" style={{ float: 'right' }} component={(props: any) => <Link {...props} to="/admin" />}>
        Dashboard
      </Button>
    </Toolbar>
  </AppBar>
);

export default Menu;
