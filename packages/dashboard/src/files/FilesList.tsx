import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query, withApollo, WithApolloClient } from 'react-apollo';
import { CircularProgress, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import { RouteComponentProps, Link } from '@reach/router';
import { graphqlQueryHelper } from '@refract-cms/core';
import { connect } from 'react-redux';
import { AppState } from '../state/app.state';
import { combineContainers } from 'combine-containers';

export interface FilesListProps extends RouteComponentProps<{ alias: string }> {}

interface Props extends FilesListProps, ReturnType<typeof mapStateToProps> {}

class FilesList extends Component<Props> {
  render() {
    const { routes } = this.props;
    const query = gql`
      {
        files: getFiles {
          _id
          url
        }
      }
    `;
    return (
      <Query query={query}>
        {({ loading, error, data }) => {
          return (
            <div>
              {loading && <CircularProgress />}
              {!loading && (
                <List>
                  {data.files.map(file => (
                    <ListItem key={file._id} button>
                      <ListItemAvatar>
                        <Avatar src={file.url} />
                      </ListItemAvatar>
                      <ListItemText primary={file._id} secondary={file.url} />
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
    routes: state.router.routes!
  };
}

export default combineContainers(connect(mapStateToProps), withApollo)(FilesList);
