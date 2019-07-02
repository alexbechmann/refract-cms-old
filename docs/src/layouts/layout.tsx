import React from 'react';
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
import { indigo } from '@material-ui/core/colors';
const favicon = require('../assets/favicon.ico');
import withRoot from '../with-root';
import { compose } from 'recompose';

interface LayoutProps {
  title: string;
}

const styles = (theme: Theme) =>
  createStyles({
    '@global h1, h2, h3, p': {
      color: 'white',
      fontFamily: 'Roboto'
    },
    '@global a': {
      color: theme.palette.secondary.main
    },
    content: {
      padding: theme.spacing.unit
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
    }
    // secondary: {
    //   main: '#4ec9b0'
    // }
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
        <Button component="a" onClick={() => navigate('/screenshots')}>
          Screenshots
        </Button>
        <Button component="a" onClick={() => navigate('/docs')}>
          Docs
        </Button>
        <IconButton href="https://github.com/alexbechmann/refract-cms">
          <GitHub />
        </IconButton>
      </Toolbar>
    </AppBar>
    <Helmet
      title={title}
      meta={[{ name: 'description', content: 'Sample' }, { name: 'keywords', content: 'sample, something' }]}
      link={[{ rel: 'icon', href: `${favicon}` }]}
    />
    <CssBaseline />
    <Grid container justify="center">
      <Grid item xs={12} sm={1} md={10} lg={10} xl={7} className={classes.content}>
        <Typography gutterBottom variant="h4" className={classes.title}>
          {title}
        </Typography>
        {children}
      </Grid>
    </Grid>
  </MuiThemeProvider>
);

export default compose(
  withRoot,
  withStyles(styles)
)(Layout) as React.ComponentType<LayoutProps>;
