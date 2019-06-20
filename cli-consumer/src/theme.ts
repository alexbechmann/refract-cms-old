import { createMuiTheme } from '@material-ui/core';
import { blue, pink } from '@material-ui/core/colors';

export default createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: blue[500]
    },
    secondary: {
      main: pink[500]
    }
  }
});
