import { MediaItem } from '@firestore-cms/core';
import React from 'react';
import { LinearProgress } from '@material-ui/core';

export default (ref: firebase.firestore.DocumentReference) => (Component: any) =>
  class WithMedia extends React.Component {
    state = {
      mediaItem: undefined
    };

    componentDidMount() {
      ref.get().then(doc => {
        this.setState({
          mediaItem: doc.data() as MediaItem
        });
      });
    }

    render() {
      console.log('hi');
      return this.state.mediaItem ? <Component mediaItem={this.state.mediaItem} /> : <LinearProgress />;
    }
  };
