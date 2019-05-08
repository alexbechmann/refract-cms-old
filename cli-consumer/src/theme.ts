import { createMuiTheme } from '@material-ui/core';
import { indigo, pink } from '@material-ui/core/colors';

export default createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: indigo[500]
    },
    secondary: {
      main: pink[500]
    }
  }
});
