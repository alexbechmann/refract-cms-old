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
  Avatar
} from '@material-ui/core';
import { EntitySchema, Entity } from '@refract-cms/core';
import { RouteComponentProps, Link, Redirect } from '@reach/router';
import { graphqlQueryHelper } from '@refract-cms/core';
import { connect } from 'react-redux';
import { AppState } from '../state/app.state';
import { combineContainers } from 'combine-containers';
import Page from '../pages/Page';

export interface EntitiesListProps extends RouteComponentProps<{ alias: string }> {}

interface Props extends EntitiesListProps, ReturnType<typeof mapStateToProps> {}

class EntitiesList extends Component<Props> {
  render() {
    const { schema, routes } = this.props;
    const entitySchema = schema.find(s => s.options.alias === this.props.alias)!;
    const query = graphqlQueryHelper.getAllQueryWithAllFields(entitySchema);
    return (
      <Page title={entitySchema.options.displayName || entitySchema.options.alias}>
        <Query query={query}>
          {({ loading, error, data }) => {
            if (loading) {
              return <CircularProgress />;
            }
            return (
              <div>
                {!entitySchema.options.maxOne ? (
                  <div>
                    <Button
                      variant="raised"
                      color="primary"
                      component={props => (
                        <Link to={routes.entity.edit.createUrl({ id: 'new', schema: entitySchema })} {...props} />
                      )}
                    >
                      Add new
                    </Button>
                    <List>
                      {data.items.map((item: Entity) => (
                        <ListItem
                          key={item._id}
                          component={props => (
                            <Link
                              to={routes.entity.edit.createUrl({ id: item._id, schema: entitySchema })}
                              {...props}
                            />
                          )}
                          button
                        >
                          {entitySchema.options.instanceImageUrl && (
                            <ListItemAvatar>
                              <Avatar src={entitySchema.options.instanceImageUrl(item)} />
                            </ListItemAvatar>
                          )}
                          <ListItemText
                            primary={
                              entitySchema.options.instanceDisplayName
                                ? entitySchema.options.instanceDisplayName(item)
                                : item._id
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </div>
                ) : (
                  <div>
                    <Button
                      variant="raised"
                      color="primary"
                      component={props => (
                        <Link
                          to={
                            data.items.length === 0
                              ? routes.entity.edit.createUrl({ id: 'new', schema: entitySchema })
                              : routes.entity.edit.createUrl({ id: data.items[0]._id, schema: entitySchema })
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
      </Page>
    );
  }
}

function mapStateToProps(state: AppState) {
  return {
    schema: state.config.schema,
    routes: state.router.routes!
  };
}

export default combineContainers(connect(mapStateToProps), withApollo)(EntitiesList);
