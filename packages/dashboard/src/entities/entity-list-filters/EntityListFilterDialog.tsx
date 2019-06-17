import React, { ComponentType } from 'react';
import {
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  List,
  ListItemText,
  Select,
  ListItem,
  InputLabel,
  FormControl,
  MenuItem,
  IconButton,
  ListItemSecondaryAction,
  Grid,
  TextField
} from '@material-ui/core';
import { compose } from 'recompose';
import { AppState } from '../../state/app.state';
import { connect } from 'react-redux';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import { EntitySchema, PropertyOptions, isBasicPropertyType } from '@refract-cms/core';
import AddIcon from '@material-ui/icons/Add';
import * as EntityActions from '../state/entity.actions';

export interface EntityListFilterDialogProps extends Pick<DialogProps, 'open' | 'onClose'> {
  schema: EntitySchema<any>;
  setOpened: (opened: boolean) => void;
}

const styles = (theme: Theme) =>
  createStyles({
    formControl: {
      marginBottom: theme.spacing()
    }
  });

interface Props
  extends EntityListFilterDialogProps,
    WithStyles<typeof styles>,
    ReturnType<typeof mapStateToProps>,
    Readonly<typeof mapDispatchToProps> {}

const EntityListFilterDialog: ComponentType<Props> = ({
  classes,
  onClose,
  open,
  setOpened,
  schema,
  filters,
  addFilter,
  updateFilter
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Filter</DialogTitle>
      <DialogContent>
        {filters.map((filter, index) => {
          return (
            <Grid key={index} container spacing={2}>
              <Grid item xs={4}>
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel>Property</InputLabel>
                  <Select
                    value={filter.propertyKey}
                    onChange={e => {
                      updateFilter({
                        alias: schema.options.alias,
                        index,
                        filter: {
                          ...filter,
                          propertyKey: e.target.value as string
                        }
                      });
                    }}
                  >
                    {Object.keys(schema.properties).map(propertyKey => (
                      <MenuItem key={propertyKey} value={propertyKey}>
                        {schema.properties[propertyKey].displayName || propertyKey}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel>Operater</InputLabel>
                  <Select
                    value={filter.operater}
                    onChange={e => {
                      updateFilter({
                        alias: schema.options.alias,
                        index,
                        filter: {
                          ...filter,
                          operater: e.target.value as any
                        }
                      });
                    }}
                  >
                    {['eq', 'neq'].map(operater => (
                      <MenuItem key={operater} value={operater}>
                        {operater}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  className={classes.formControl}
                  fullWidth
                  label="Value"
                  value={filter.value}
                  onChange={e => {
                    updateFilter({
                      alias: schema.options.alias,
                      index,
                      filter: {
                        ...filter,
                        value: e.target.value as string
                      }
                    });
                  }}
                />
              </Grid>
            </Grid>
          );
        })}
        <Button
          onClick={() => {
            addFilter({ schema });
          }}
        >
          Add filter
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpened(false)}>Done</Button>
      </DialogActions>
    </Dialog>
  );
};

function mapStateToProps(state: AppState, ownProps: EntityListFilterDialogProps) {
  return {
    filters: state.entity[ownProps.schema.options.alias].filters
  };
}

const mapDispatchToProps = { ...EntityActions };

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(EntityListFilterDialog) as ComponentType<EntityListFilterDialogProps>;
