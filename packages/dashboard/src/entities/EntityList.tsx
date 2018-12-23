import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query, withApollo, WithApolloClient } from 'react-apollo';
import {
  CircularProgress,
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
  Select
} from '@material-ui/core';
import { EntitySchema, Entity, graphqlQueryHelper, EntityListItem } from '@refract-cms/core';
import { RouteComponentProps, Link, Redirect } from '@reach/router';
import { connect } from 'react-redux';
import { AppState } from '../state/app.state';
import { combineContainers } from 'combine-containers';
import Page from '../pages/Page';
import { merge, pickBy, isUndefined, negate } from 'lodash';
import { FilterList, AddCircle } from '@material-ui/icons';
import { setOrderByField } from './state/entity.actions';
import RenderEditor from './RenderEditor';

export interface EntitiesListProps extends RouteComponentProps<{ alias: string }> {}

interface Props extends EntitiesListProps, ReturnType<typeof mapStateToProps>, DispatchProps {}

interface State {
  filterDialogOpen: boolean;
}

class EntitiesList extends Component<Props> {
  state: State = {
    filterDialogOpen: false
  };
  render() {
    const { schema, routes, entitySchema, setOrderByField } = this.props;
    const query = graphqlQueryHelper.getAllQueryWithAllFields(entitySchema);
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
                // () => (
                //   <IconButton onClick={() => this.setState({ filterDialogOpen: true })}>
                //     <FilterList />
                //   </IconButton>
                // ),
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
        <Query query={query}>
          {({ loading, error, data }) => {
            const items = data.items || [];
            if (loading) {
              return <CircularProgress />;
            }
            return (
              <div>
                {!entitySchema.options.maxOne ? (
                  <div>
                    <List>
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
              </div>
            );
          }}
        </Query>
        <Dialog open={this.state.filterDialogOpen} onClose={() => this.setState({ filterDialogOpen: false })}>
          <DialogContent>
            {Object.keys(entitySchema.properties).map((propertyKey: string, index: number) => {
              const propertyOptions = entitySchema.properties[propertyKey];
              return (
                <RenderEditor
                  key={index}
                  propertyKey={propertyKey}
                  propertyOptions={propertyOptions}
                  value={undefined}
                  setValue={console.log}
                />
              );
            })}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({ filterDialogOpen: false })}>Done</Button>
          </DialogActions>
        </Dialog>
      </Page>
    );
  }
}

const mapDispatchToProps = { setOrderByField };

type DispatchProps = typeof mapDispatchToProps;

function mapStateToProps(state: AppState, ownProps: EntitiesListProps) {
  const entitySchema = state.config.schema.find(s => s.options.alias === ownProps.alias)!;
  return {
    schema: state.config.schema,
    routes: state.router.routes!,
    entitySchema,
    filters: state.entity[ownProps.alias!] || { orderByField: '' }
  };
}

export default combineContainers(connect(mapStateToProps), withApollo)(EntitiesList);
