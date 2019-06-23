import React, { ComponentType } from 'react';
import { Theme, createStyles, WithStyles, withStyles, ButtonGroup, Button } from '@material-ui/core';
import { compose } from 'recompose';
import { connect } from 'react-redux';

export interface ToolbarProps {}

const styles = (theme: Theme) => createStyles({});

interface Props extends ToolbarProps, WithStyles<typeof styles> {}

const Toolbar: ComponentType<Props> = ({ classes }) => {
  return (
    <div>
      <ButtonGroup size="small" aria-label="Small outlined button group">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
    </div>
  );
};

export default compose(withStyles(styles))(Toolbar) as ComponentType<ToolbarProps>;
