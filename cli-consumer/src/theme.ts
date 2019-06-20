import { createMuiTheme } from '@material-ui/core';
import { teal, blueGrey } from '@material-ui/core/colors';

export default createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: teal[500]
    },
    secondary: {
      main: blueGrey[500]
    }
  }
});
