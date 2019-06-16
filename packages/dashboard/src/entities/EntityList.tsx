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
import EntityListFilterDialog from './EntityListFilterDialog';

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
    const { schema, routes, entitySchema, classes, filters } = this.props;
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
        <EntityListFilterDialog
          schema={entitySchema}
          open={this.state.filterDialogOpen}
          onClose={() => this.setState({ filterDialogOpen: false })}
          setOpened={opened => this.setState({ filterDialogOpen: opened })}
        />
      </div>
    );
  }
}

const mapDispatchToProps = {};

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
