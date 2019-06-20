import React, { ComponentType } from 'react';
import {
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  Typography,
  AppBar,
  Toolbar,
  Container,
  Grid
} from '@material-ui/core';
import classNames from 'classnames';

export interface PageProps {
  disablePadding?: boolean;
  title: string;
  actionComponents?: React.ReactElement<any>[];
}

const styles = (theme: Theme) =>
  createStyles({
    padded: {
      // adding: theme.spacing(3)
    },
    appBar: {
      top: 'auto',
      bottom: 0,
      background: theme.palette.background.default
    },
    toolbar: {
      //marginLeft: 240,
      marginTop: theme.spacing(9),
      alignItems: 'center',
      justifyContent: 'space-between'
      // minHeight: 40,
      // height: 40
      //marginBottom: theme.spacing(3)
    },
    page: {
      //marginTop: 64
    },
    pageContent: {
      marginTop: theme.spacing(4),
      paddingBottom: theme.spacing(4)
    },
    actionButton: {
      marginLeft: theme.spacing()
    },
    grow: {
      flexGrow: 1
    }
  });

interface Props extends PageProps, WithStyles<typeof styles> {}

const Page: ComponentType<Props> = ({ children, classes, disablePadding, title, actionComponents }) => (
  <div
    className={classNames(classes.page, {
      [classes.padded]: !disablePadding
    })}
  >
    <Toolbar className={classes.toolbar} disableGutters>
      <Typography variant="h5">{title}</Typography>
    </Toolbar>
    {children}
    <AppBar position="fixed" color="default" className={classes.appBar}>
      <Toolbar>
        <div />
        <div className={classes.grow} />
        <div>
          {actionComponents &&
            actionComponents.map((Component, index) => (
              <span key={index} className={classes.actionButton}>
                {Component}
              </span>
            ))}
        </div>
      </Toolbar>
    </AppBar>
  </div>
);

export default withStyles(styles)(Page) as ComponentType<PageProps>;
