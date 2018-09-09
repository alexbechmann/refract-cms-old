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
  IconButton,
  Button
} from '@material-ui/core';
import mediaService from './media.service';
import * as Icons from '@material-ui/icons';
import { Entity } from '../entities/entity.model';
import ImageUploaderDialog from './ImageUploaderDialog';

interface State {
  media: Entity[];
  uploadDialogOpen: boolean;
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
    media: [],
    uploadDialogOpen: false
  };

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    mediaService.getAll().then(media => {
      this.setState({
        media
      });
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button onClick={() => this.setState({ uploadDialogOpen: true })}>Upload</Button>
        <ImageUploaderDialog
          open={this.state.uploadDialogOpen}
          handleClose={() =>
            this.setState({
              uploadDialogOpen: false
            })
          }
          onUploaded={() => {
            this.refresh();
            this.setState({
              uploadDialogOpen: false
            });
          }}
        />
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
      mediaService.delete(id).then(() => this.refresh());
    }
  };
}

export default withStyles(styles)(Media) as React.ComponentType<{}>;
