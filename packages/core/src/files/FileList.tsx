import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { CircularProgress, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import { FileModel } from './file.model';

import EntityListItem from '../entities/EntityListItem';
import { FileSchema } from './file.schema';

interface FileListProps {
  onSelectFile: (file: FileModel) => void;
}

interface Props extends FileListProps {}

class FileList extends Component<Props> {
  render() {
    const { onSelectFile } = this.props;
    const query = gql`
      {
        files: fileMany {
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
              {loading ? (
                <CircularProgress />
              ) : (
                <List>
                  {data.files.map((file: FileModel) => (
                    <EntityListItem
                      entity={file}
                      schema={FileSchema}
                      key={file._id}
                      button
                      onClick={() => onSelectFile(file)}
                    />
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
