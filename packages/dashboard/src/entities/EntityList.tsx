import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query, withApollo, WithApolloClient } from 'react-apollo';
import {
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Button,
  ListSubheader,
  ListItemAvatar,
  Avatar,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Theme,
  createStyles,
  withStyles,
  DialogTitle,
  WithStyles
} from '@material-ui/core';
import { EntitySchema, Entity, graphqlQueryHelper, EntityListItem, PropertyOptions } from '@refract-cms/core';
import { RouteComponentProps, Link, Redirect } from '@reach/router';
import { connect } from 'react-redux';
import { AppState } from '../state/app.state';
import { combineContainers } from 'combine-containers';
import Page from '../pages/Page';
import Sort from '@material-ui/icons/Sort';
import Refresh from '@material-ui/icons/Refresh';
import { setOrderByField, setOrderByDirection } from './state/entity.actions';

export interface EntitiesListProps extends RouteComponentProps<{ alias: string }> {}

interface Props
  extends EntitiesListProps,
    ReturnType<typeof mapStateToProps>,
    DispatchProps,
    WithStyles<typeof styles> {}

interface State {
  filterDialogOpen: boolean;
}

const styles = (theme: Theme) =>
  createStyles({
    formControl: {
      marginBottom: theme.spacing.unit
    },
    textLink: {
      cursor: 'pointer',
      color: theme.palette.secondary.main,
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  });

class EntitiesList extends Component<Props> {
  state: State = {
    filterDialogOpen: false
  };

  render() {
    const { schema, routes, entitySchema, setOrderByField, filters, classes } = this.props;
    const query = graphqlQueryHelper.getAllQueryWithAllFields(entitySchema, filters);
    return (
      <div>
        <Query query={query} displayName={`${entitySchema.options.alias}_list`} notifyOnNetworkStatusChange>
          {({ loading, error, data, refetch, variables }) => {
            const items = data.items || [];
            if (loading) {
              return <LinearProgress />;
            }
            return (
              <Page
                title={entitySchema.options.displayName || entitySchema.options.alias}
                actionComponents={
                  !entitySchema.options.maxOne
                    ? [
                        // () => (
                        //   <FormControl>
                        //     <InputLabel>Age</InputLabel>
                        //     <Select
                        //       value={this.props.filters.orderByField}
                        //       onChange={e =>
                        //         setOrderByField({
                        //           alias: entitySchema.options.alias,
                        //           orderByField: e.target.value
                        //         })
                        //       }
                        //     >
                        //       <MenuItem value={'createDate'}>Create Date</MenuItem>
                        //       <MenuItem value={'a'}>Twenty</MenuItem>
                        //       <MenuItem value={'b'}>Thirty</MenuItem>
                        //     </Select>
                        //   </FormControl>
                        // ),
                        () => (
                          <IconButton disabled={loading} onClick={() => refetch(variables)}>
                            <Refresh />
                          </IconButton>
                        ),
                        () => (
                          <IconButton onClick={() => this.setState({ filterDialogOpen: true })}>
                            <Sort />
                          </IconButton>
                        ),
                        () => (
                          <Button
                            variant="contained"
                            color="primary"
                            component={props => (
                              <Link to={routes.entity.edit.createUrl({ id: 'new', schema: entitySchema })} {...props} />
                            )}
                          >
                            Add new
                          </Button>
                        )
                      ]
                    : undefined
                }
              >
                {!entitySchema.options.maxOne ? (
                  <div>
                    <List
                      subheader={
                        filters && filters.orderByField && filters.orderByDirection ? (
                          <ListSubheader
                            className={classes.textLink}
                            onClick={() => this.setState({ filterDialogOpen: true })}
                          >
                            Sorted by{' '}
                            {(entitySchema.properties[filters.orderByField] as PropertyOptions<any, any>).displayName},{' '}
                            {filters.orderByDirection}
                          </ListSubheader>
                        ) : (
                          undefined
                        )
                      }
                    >
                      {items.map((item: Entity) => {
                        return (
                          <EntityListItem
                            key={item._id}
                            component={props => (
                              <Link
                                to={routes.entity.edit.createUrl({ id: item._id, schema: entitySchema })}
                                {...props}
                              />
                            )}
                            button
                            entity={item}
                            schema={entitySchema}
                          />
                        );
                      })}
                    </List>
                  </div>
                ) : (
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      component={props => (
                        <Link
                          to={
                            items.length === 0
                              ? routes.entity.edit.createUrl({ id: 'new', schema: entitySchema })
                              : routes.entity.edit.createUrl({ id: items[0]._id, schema: entitySchema })
                          }
                          {...props}
                        />
                      )}
                    >
                      Edit {entitySchema.options.displayName || entitySchema.options.alias}
                    </Button>
                  </div>
                )}
              </Page>
            );
          }}
        </Query>
        <Dialog open={this.state.filterDialogOpen} onClose={() => this.setState({ filterDialogOpen: false })}>
          <DialogTitle>Sort</DialogTitle>
          <DialogContent style={{ width: 400 }}>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel>Sort by</InputLabel>
              <Select
                value={this.props.filters.orderByField || ''}
                onChange={e =>
                  this.props.setOrderByField({
                    alias: entitySchema.options.alias,
                    orderByField: e.target.value
                  })
                }
              >
                <MenuItem value="">None</MenuItem>
                {Object.keys(entitySchema.properties)
                  .filter(
                    propertyKey =>
                      entitySchema.properties[propertyKey].type === String ||
                      entitySchema.properties[propertyKey].type === Date ||
                      entitySchema.properties[propertyKey].type === Number
                  )
                  .map((propertyKey: string, index: number) => {
                    const propertyOptions = entitySchema.properties[propertyKey] as PropertyOptions<any, any>;
                    return (
                      <MenuItem key={index} value={propertyKey}>
                        {propertyOptions.displayName || propertyKey}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel>Direction</InputLabel>
              <Select
                value={this.props.filters.orderByDirection}
                onChange={e =>
                  this.props.setOrderByDirection({
                    alias: entitySchema.options.alias,
                    direction: e.target.value as 'ASC' | 'DESC'
                  })
                }
              >
                <MenuItem value="ASC">ASC</MenuItem>
                <MenuItem value="DESC">DESC</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({ filterDialogOpen: false })}>Done</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapDispatchToProps = { setOrderByField, setOrderByDirection };

type DispatchProps = typeof mapDispatchToProps;

function mapStateToProps(state: AppState, ownProps: EntitiesListProps) {
  const entitySchema = state.config.schema.find(s => s.options.alias === ownProps.alias)!;
  const filters = state.entity[entitySchema.options.alias];
  return {
    schema: state.config.schema,
    routes: state.router.routes!,
    entitySchema,
    filters
  };
}

export default combineContainers(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withApollo,
  withStyles(styles)
)(EntitiesList);
