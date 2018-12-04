import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { CircularProgress, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';

interface FilePickerDialogProps {
}

interface Props extends FilePickerDialogProps { }

class FilePickerDialog extends Component<Props> {

  render() {
    return (
      <div>
        file picker dialog
        </div>
    );
  }
}

export default FilePickerDialog as React.ComponentType<FilePickerDialogProps>