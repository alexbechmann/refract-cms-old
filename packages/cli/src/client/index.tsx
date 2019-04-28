import React from 'react';
import { render } from 'react-dom';
import { Dashboard } from '@refract-cms/dashboard';
import config from '@consumer/config/refract.config';
import theme from '@consumer/config/theme';
// import 'typeface-roboto';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { teal, blue } from '@material-ui/core/colors';

render(
  <MuiThemeProvider theme={theme}>
    <Dashboard config={config} rootPath="/" serverUrl="/cms" />
  </MuiThemeProvider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
