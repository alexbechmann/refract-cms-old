import { createMuiTheme } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';

export default createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: indigo[500]
    }
  },
  typography: {
    useNextVariants: true
  }
});
