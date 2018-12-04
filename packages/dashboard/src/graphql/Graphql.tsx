import React from 'react';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core';
import { RouteComponentProps } from '@reach/router';

const styles = (theme: Theme) =>
  createStyles({
    iframe: {
      width: '100%',
      height: '100vh',
      border: 'none'
    }
  });

interface GraphqlProps extends RouteComponentProps {
  serverUrl: string;
}

interface Props extends GraphqlProps, WithStyles<typeof styles> {}

export default withStyles(styles)(({ serverUrl, classes }: Props) => (
  <iframe className={classes.iframe} src={`${serverUrl}/graphql`} />
));
