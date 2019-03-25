import * as React from 'react';
import Link, { navigate } from 'gatsby-link';
import Helmet from 'react-helmet';
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  createStyles,
  Theme,
  Grid,
  withStyles,
  WithStyles,
  createMuiTheme,
  MuiThemeProvider,
  IconButton,
  Button
} from '@material-ui/core';
import 'typeface-roboto';
import GitHub from '../icons/GitHub';
import { yellow, indigo } from '@material-ui/core/colors';

interface LayoutProps {
  title: string;
}

const styles = (theme: Theme) =>
  createStyles({
    '@global h1, h2, h3, p': {
      color: 'white',
      fontFamily: 'Roboto'
    },
    content: {
      padding: theme.spacing.unit,
      maxWidth: 1000
    },
    grow: {
      flexGrow: 1
    },
    appBar: {
      marginBottom: theme.spacing.unit * 3
    },
    title: {
      marginBottom: theme.spacing.unit * 3
    }
  });

interface Props extends LayoutProps, WithStyles<typeof styles> {}

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: indigo[600]
    },
    secondary: {
      main: '#4ec9b0'
    }
  }
});

const Layout: React.ComponentType<Props> = ({ title, children, classes }) => (
  <MuiThemeProvider theme={theme}>
    <AppBar position="sticky" className={classes.appBar}>
      <Toolbar>
        <Typography color="inherit" variant="h6">
          <Link to="/" style={{ color: 'white' }}>
            Refract Cms docs
          </Link>
        </Typography>
        <div className={classes.grow} />
        <Button component="a" onClick={() => navigate('/existing-project')}>
          Add to an existing project
        </Button>
        <Button disabled component="a" onClick={() => navigate('/cli-start')}>
          Install using CLI (Coming soon...)
        </Button>
        <IconButton href="https://github.com/alexbechmann/refract-cms">
          <GitHub />
        </IconButton>
      </Toolbar>
    </AppBar>
    <Helmet
      title={title}
      meta={[{ name: 'description', content: 'Sample' }, { name: 'keywords', content: 'sample, something' }]}
    />
    <CssBaseline />
    <Grid container justify="center">
      <Grid item xs={12} sm={10} md={8} lg={7} className={classes.content}>
        <Typography gutterBottom variant="h4" className={classes.title}>
          {title}
        </Typography>
        {children}
      </Grid>
    </Grid>
  </MuiThemeProvider>
);

export default withStyles(styles)(Layout) as React.ComponentType<LayoutProps>;
