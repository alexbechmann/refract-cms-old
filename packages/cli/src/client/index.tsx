import React from 'react';
import { render } from 'react-dom';
import { Dashboard } from '@refract-cms/dashboard';
import config from '@consumer/config/refract.config';
// import 'typeface-roboto';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { teal, blue } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: blue[500]
    },
    secondary: {
      main: teal[500]
    }
  }
});

render(
  <MuiThemeProvider theme={theme}>
    <Dashboard config={config} rootPath="/" serverUrl="/cms" />
  </MuiThemeProvider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
