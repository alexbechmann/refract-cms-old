import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { CircularProgress, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import { File } from './file.model';

interface FileListProps {
  onSelectFile: (file: File) => void;
}

interface Props extends FileListProps {}

class FileList extends Component<Props> {
  render() {
    const { onSelectFile } = this.props;
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
                  {data.files.map((file: File) => (
                    <ListItem key={file._id} button onClick={() => onSelectFile(file)}>
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

export default FileList as React.ComponentType<FileListProps>;
