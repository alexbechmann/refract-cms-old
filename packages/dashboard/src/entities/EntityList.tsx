import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query, withApollo, WithApolloClient } from 'react-apollo';
import { CircularProgress, List, ListItem, ListItemText } from '@material-ui/core';
import { EntitySchema } from '@refract-cms/core';
import { RouteComponentProps, Link } from '@reach/router';
import { graphqlQueryHelper } from '@refract-cms/core';
import { connect } from 'react-redux';
import { AppState } from '../state/app.state';
import { combineContainers } from 'combine-containers';

export interface EntitiesListProps extends RouteComponentProps<{ alias: string }> {}

interface Props extends EntitiesListProps, ReturnType<typeof mapStateToProps> {}

class EntitiesList extends Component<Props> {
  render() {
    const { schema, routes } = this.props;
    const entitySchema = schema.find(s => s.options.alias === this.props.alias)!;
    const query = graphqlQueryHelper.getAllQueryWithAllFields(entitySchema);
    return (
      <Query query={query}>
        {({ loading, error, data }) => {
          return (
            <div>
              {loading && <CircularProgress />}
              {!loading && (
                <List>
                  <ListItem
                    component={props => (
                      <Link to={routes.entity.edit.createUrl({ id: 'new', schema: entitySchema })} {...props} />
                    )}
                    button
                  >
                    <ListItemText primary={`Add new ${entitySchema.options.displayName}`} />
                  </ListItem>
                  {data.items.map(item => (
                    <ListItem
                      key={item._id}
                      component={props => (
                        <Link to={routes.entity.edit.createUrl({ id: item._id, schema: entitySchema })} {...props} />
                      )}
                      button
                    >
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
              )}
            </div>
          );
        }}
      </Query>
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
