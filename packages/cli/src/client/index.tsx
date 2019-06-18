import React from 'react';
import { render } from 'react-dom';
import { Dashboard } from '@refract-cms/dashboard';
import config from '@consumer/config/refract.config';
import theme from '@consumer/config/theme';
// import 'typeface-roboto';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

render(
  <ThemeProvider theme={theme}>
    <Dashboard config={config} rootPath="/" serverUrl="/cms" />
  </ThemeProvider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
