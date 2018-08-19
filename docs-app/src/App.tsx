import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import * as Icons from '@material-ui/icons';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import MarkdownDoc from './MarkdownDoc';
import { PositionProperty } from 'csstype';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import 'typeface-roboto';

const styles = (theme: Theme) => ({
  appBar: {
    position: 'relative' as PositionProperty
  },
  icon: {
    marginRight: theme.spacing.unit * 2
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
            <Typography variant="title" color="inherit" noWrap>
              Refract CMS
            </Typography>
          </Toolbar>
        </AppBar>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/core" component={() => <MarkdownDoc path={require('@refract-cms/core/README.md')} />} />
            <Route path="/server" component={() => <MarkdownDoc path={require('@refract-cms/server/README.md')} />} />
          </Switch>
        </BrowserRouter>
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
