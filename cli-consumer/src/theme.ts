import { createMuiTheme } from '@material-ui/core';
import { deepPurple, teal } from '@material-ui/core/colors';

export default createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: deepPurple[500]
    },
    secondary: {
      main: teal[500]
    }
  }
});
