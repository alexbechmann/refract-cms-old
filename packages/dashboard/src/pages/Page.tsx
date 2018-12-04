import React, { ComponentType } from 'react';
import { Theme, createStyles, WithStyles, withStyles, Typography } from '@material-ui/core';
import classNames from 'classnames';

export interface PageProps {
  disablePadding?: boolean;
  title: string;
}

const styles = (theme: Theme) =>
  createStyles({
    padded: {
      padding: theme.spacing.unit * 3
    }
  });

interface Props extends PageProps, WithStyles<typeof styles> {}

const Page: ComponentType<Props> = ({ children, classes, disablePadding, title }) => (
  <div
    className={classNames({
      [classes.padded]: !disablePadding
    })}
  >
    <Typography gutterBottom variant="h4">
      {title}
    </Typography>
    {children}
  </div>
);

export default withStyles(styles)(Page) as ComponentType<PageProps>;
