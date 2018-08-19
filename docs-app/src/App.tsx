import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import * as Icons from '@material-ui/icons';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import MarkdownDoc from './MarkdownDoc';
import { PositionProperty } from 'csstype';
import { Route, Switch, Link } from 'react-router-dom';
import Home from './Home';
import { IconButton } from '@material-ui/core';
import GitHub from './icons/GitHub';

const styles = (theme: Theme) => ({
  appBar: {
    position: 'relative' as PositionProperty
  },
  icon: {
    marginRight: theme.spacing.unit * 2
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  flex: {
    flexGrow: 1
  }
});

interface Props extends WithStyles<typeof styles> {}

class App extends React.Component<Props, any> {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar elevation={0} position="static" className={classes.appBar}>
          <Toolbar>
            <Icons.Code className={classes.icon} />
            <Typography className={classes.flex} variant="title" color="inherit" noWrap>
              Refract CMS
            </Typography>
            <IconButton color="inherit" component={(buttonProps: any) => <Link to="/" {...buttonProps} />}>
              <Icons.Home />
            </IconButton>
            <IconButton target="_blank" color="inherit" href="https://github.com/alexbechmann/refract-cms">
              <GitHub />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            path="/core"
            component={() => (
              <div className={classes.layout}>
                <MarkdownDoc path={require('@refract-cms/core/README.md')} />
              </div>
            )}
          />
          <Route
            path="/server"
            component={() => (
              <div className={classes.layout}>
                <MarkdownDoc path={require('@refract-cms/server/README.md')} />
              </div>
            )}
          />
        </Switch>
        {/* Footer */}
        {/* <footer className={classes.footer}>
        <Typography variant="title" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subheading" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
      </footer> */}
        {/* End footer */}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
