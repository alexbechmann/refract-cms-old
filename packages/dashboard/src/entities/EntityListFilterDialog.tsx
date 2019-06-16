import React, { ComponentType } from 'react';
import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core';
import { compose } from 'recompose';
import { AppState } from '../state/app.state';
import { connect } from 'react-redux';
import { DialogProps } from '@material-ui/core/Dialog';
import { EntitySchema } from '@refract-cms/core';

export interface EntityListFilterDialogProps extends Pick<DialogProps, 'open' | 'onClose'> {
  schema: EntitySchema<any>;
  setOpened: (opened: boolean) => void;
}

const styles = (theme: Theme) => createStyles({});

interface Props
  extends EntityListFilterDialogProps,
    WithStyles<typeof styles>,
    ReturnType<typeof mapStateToProps>,
    Readonly<typeof mapDispatchToProps> {}

const EntityListFilterDialog: ComponentType<Props> = ({ classes }) => {
  return <div>EntityListFilterDialog</div>;
};

function mapStateToProps(state: AppState, ownProps: EntityListFilterDialogProps) {
  return {};
}

const mapDispatchToProps = {};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(EntityListFilterDialog) as ComponentType<EntityListFilterDialogProps>;
