import * as React from 'react';
import Link from 'gatsby-link';
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
  MuiThemeProvider
} from '@material-ui/core';
import 'typeface-roboto';

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
    }
  });

interface Props extends LayoutProps, WithStyles<typeof styles> {}

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  }
});

const Layout: React.ComponentType<Props> = ({ title, children, classes }) => (
  <MuiThemeProvider theme={theme}>
    <AppBar position="sticky">
      <Toolbar>
        <Typography color="inherit" variant="h6">
          Refract CMS Docs
        </Typography>
      </Toolbar>
    </AppBar>
    <Helmet
      title={title}
      meta={[{ name: 'description', content: 'Sample' }, { name: 'keywords', content: 'sample, something' }]}
    />
    <CssBaseline />
    <Grid container justify="center">
      <Grid item xs={12} sm={10} md={8} lg={7} className={classes.content}>
        {children}
      </Grid>
    </Grid>
  </MuiThemeProvider>
);

export default withStyles(styles)(Layout) as React.ComponentType<LayoutProps>;
