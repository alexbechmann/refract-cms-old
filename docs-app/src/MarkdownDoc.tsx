import * as React from 'react';
import { LinearProgress, Typography } from '@material-ui/core';
import * as Markdown from 'react-markdown';

interface Props {
  path: string;
}

interface State {
  doc?: string;
}

class MarkdownDoc extends React.Component<Props, State> {
  state = {
    doc: ''
  };

  componentDidMount() {
    fetch(this.props.path)
      .then(response => {
        return response.text();
      })
      .then(doc => this.setState({ doc }));
  }

  render() {
    return this.state.doc ? (
      <Typography component="div">
        <Markdown source={this.state.doc} />
      </Typography>
    ) : (
      <LinearProgress />
    );
  }
}

export default MarkdownDoc;
