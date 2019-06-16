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
  Grid
} from '@material-ui/core';
import { compose } from 'recompose';
import { AppState } from '../../state/app.state';
import { connect } from 'react-redux';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import { EntitySchema, PropertyOptions, isBasicPropertyType } from '@refract-cms/core';
import AddIcon from '@material-ui/icons/Add';

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

const EntityListFilterDialog: ComponentType<Props> = ({ classes, onClose, open, setOpened, schema }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Filter</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel>Property</InputLabel>
              <Select
                //value={filters.orderByDirection}
                onChange={e => console.log(e)}
              >
                {Object.keys(schema.properties).map(propertyKey => (
                  <MenuItem value={propertyKey}>{schema.properties[propertyKey].displayName || propertyKey}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            b
          </Grid>
          <Grid item xs={4}>
            c
          </Grid>
        </Grid>
        {/* {Object.keys(schema.properties).map(propertyKey => (
          <RenderProperty propertyOptions={schema.properties[propertyKey]} propertyKey={propertyKey} />
        ))} */}
        <Button>Add filter</Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpened(false)}>Done</Button>
      </DialogActions>
    </Dialog>
  );
};

// const RenderProperty = ({
//   propertyOptions,
//   propertyKey
// }: {
//   propertyOptions: PropertyOptions<any, any>;
//   propertyKey: string;
// }) => {
//   if (isBasicPropertyType(propertyOptions.type)) {
//     return <div />;
//   }

//   return null;
// };

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
