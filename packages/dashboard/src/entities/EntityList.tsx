import React, { Component } from 'react';
import { Query, withApollo } from 'react-apollo';
import {
  LinearProgress,
  List,
  Button,
  ListSubheader,
  IconButton,
  Theme,
  createStyles,
  withStyles,
  WithStyles,
  Table,
  TableBody,
  TableRow,
  TablePagination,
  Badge,
  Tooltip
} from '@material-ui/core';
import { Entity, graphqlQueryHelper, EntityListItem, PropertyOptions } from '@refract-cms/core';
import { RouteComponentProps, Link } from '@reach/router';
import { connect } from 'react-redux';
import { AppState } from '../state/app.state';
import { combineContainers } from 'combine-containers';
import Page from '../pages/Page';
import Sort from '@material-ui/icons/Sort';
import Filter from '@material-ui/icons/FilterList';
import Refresh from '@material-ui/icons/Refresh';
import EntityListSortDialog from './EntityListSortDialog';
import EntityListFilterDialog from './entity-list-filters/EntityListFilterDialog';
import { createLinkComponent } from '../shared/create-link-component';
import * as EntityActions from './state/entity.actions';

export interface EntitiesListProps extends RouteComponentProps<{ alias: string }> {}

interface Props
  extends EntitiesListProps,
    ReturnType<typeof mapStateToProps>,
    DispatchProps,
    WithStyles<typeof styles> {}

interface State {
  sortDialogOpen: boolean;
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
    sortDialogOpen: false,
    filterDialogOpen: false
  };

  render() {
    const { routes, entitySchema, classes, filters, setPage } = this.props;
    const query = graphqlQueryHelper.getAllQueryWithAllFields(entitySchema);
    let transformedFilter = {};
    let transformedSort = {};
    if (filters.filters) {
      transformedFilter = {
        AND: filters.filters.map(f => ({
          [f.propertyKey]: {
            [f.operater]: f.value
          }
        }))
      };
    }
    if (filters.orderByDirection && filters.orderByField) {
      transformedSort = {
        [filters.orderByField]: filters.orderByDirection
      };
    }

    return (
      <div>
        <Query
          query={query}
          variables={{
            filter: transformedFilter,
            sort: transformedSort,
            pagination: {
              skip: filters.currentPage * 10,
              limit: 10
            }
          }}
          displayName={`${entitySchema.options.alias}_list`}
          notifyOnNetworkStatusChange
          fetchPolicy="network-only"
        >
          {({ loading, data, refetch, variables }) => {
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
                        <IconButton disabled={loading} onClick={() => refetch(variables)}>
                          <Refresh />
                        </IconButton>,
                        <IconButton onClick={() => this.setState({ sortDialogOpen: true })}>
                          <Tooltip title="Sort">
                            <Badge variant="dot" badgeContent={filters.orderByField ? 1 : 0} color="secondary">
                              <Sort />
                            </Badge>
                          </Tooltip>
                        </IconButton>,

                        <IconButton onClick={() => this.setState({ filterDialogOpen: true })}>
                          <Tooltip title="Filters">
                            <Badge badgeContent={filters.filters.length} color="secondary">
                              <Filter />
                            </Badge>
                          </Tooltip>
                        </IconButton>,
                        <Button
                          variant="contained"
                          color="primary"
                          component={createLinkComponent(
                            routes.entity.edit.createUrl({ id: 'new', schema: entitySchema })
                          )}
                        >
                          Add new
                        </Button>
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
                            onClick={() => this.setState({ sortDialogOpen: true })}
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
                            component={createLinkComponent(
                              routes.entity.edit.createUrl({ id: item._id, schema: entitySchema })
                            )}
                            button
                            entity={item}
                            schema={entitySchema}
                          />
                        );
                      })}
                    </List>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TablePagination
                            page={filters.currentPage}
                            count={data.count}
                            // onChangeRowsPerPage={e => setpag}
                            onChangePage={(e, page) => {
                              setPage({
                                alias: entitySchema.options.alias,
                                page
                              });
                            }}
                            rowsPerPage={10}
                            //rowsPerPageOptions={[5, 10, 25, 50]}
                            // @ts-ignore
                            // ActionsComponent={TablePaginationActions}
                          />
                        </TableRow>
                      </TableBody>
                    </Table>
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
        <EntityListSortDialog
          schema={entitySchema}
          open={this.state.sortDialogOpen}
          onClose={() => this.setState({ sortDialogOpen: false })}
          setOpened={opened => this.setState({ sortDialogOpen: opened })}
        />
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

const mapDispatchToProps = { ...EntityActions };

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
