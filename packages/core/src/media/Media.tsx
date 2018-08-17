import * as React from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListSubheader,
  Theme,
  withStyles,
  WithStyles,
  IconButton
} from '@material-ui/core';
import entityService from '../entities/entity.service';
import mediaService from './media.service';
import * as Icons from '@material-ui/icons';
import { Entity } from '../entities/entity.model';
import ImageUploader from './ImageUploader';

interface State {
  media: Entity[];
}

const styles = (theme: Theme) => ({
  iconButton: {
    margin: theme.spacing.unit
  }
});

interface Props extends WithStyles<typeof styles> {}

class Media extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.refresh = this.refresh.bind(this);
  }

  state: State = {
    media: []
  };

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    entityService
      .getAll({
        alias: 'media.files'
      })
      .then(media => {
        this.setState({
          media
        });
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <ImageUploader onUploaded={this.refresh} />
        <List>
          <ListSubheader title="Media" />
          {this.state.media.map(mediaItem => {
            return (
              <ListItem key={mediaItem._id}>
                <div
                  style={{
                    height: '50px',
                    width: '50px',
                    backgroundImage: `url(${mediaService.buildUrl(mediaItem._id)})`,
                    backgroundSize: 'cover'
                  }}
                />
                <ListItemText primary={mediaItem._id} />
                <ListItemSecondaryAction>
                  <ListItemSecondaryAction>
                    <IconButton onClick={this.deleteMediaItem(mediaItem._id)} className={classes.iconButton}>
                      <Icons.Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  }

  deleteMediaItem = (id: string) => () => {
    if (confirm('Are you sure you want to delete this item?')) {
      entityService
        .delete({
          alias: 'media.files',
          id
        })
        .then(() => this.refresh());
    }
  };
}

export default withStyles(styles)(Media) as React.ComponentType<{}>;
