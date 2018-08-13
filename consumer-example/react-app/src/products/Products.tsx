import React from 'react';
import { entityService } from '@firestore-cms/core';
import { Product } from './product.model';
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  CardHeader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles,
  WithStyles,
  CardMedia
} from '@material-ui/core';
import * as Icons from '@material-ui/icons';
import withMedia from '../media/with-media';

interface State {
  products: Product[];
  loading: boolean;
}

const styles = {
  card: {
    marginBottom: '10px',
    maxWidth: '345px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  }
};

interface Props extends WithStyles<typeof styles> {}

class Products extends React.Component<Props, State> {
  state: State = {
    products: [],
    loading: true
  };

  renderImage(imageRef: firebase.firestore.DocumentReference) {
    const { classes } = this.props;
    const ImageComponent = withMedia(imageRef)(props => (
      <CardMedia className={classes.media} image={props.mediaItem.url} />
    ));
    return <ImageComponent />;
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography variant="headline" gutterBottom>
          Products
        </Typography>
        {this.state.products.map(product => {
          return (
            <Card className={classes.card} key={product['_id']}>
              {/* {imageRef && this.renderImage(imageRef)} */}
              <CardHeader title={product.title} />
              <CardContent>
                <List component="nav">
                  <ListItem>
                    <ListItemIcon>
                      <Icons.LocationOn />
                    </ListItemIcon>
                    <ListItemText primary={`${product.location.latitude}, ${product.location.longitude}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Icons.Filter />
                    </ListItemIcon>
                    <ListItemText primary={product.productType} />
                  </ListItem>
                </List>
              </CardContent>
              <CardActions>
                <Button>See more</Button>
              </CardActions>
            </Card>
          );
        })}
      </div>
    );
  }

  componentDidMount() {
    entityService
      .getAll({
        alias: 'product'
      })
      .then(products => {
        this.setState({
          products
        });
      });
  }
}

export default withStyles(styles)(Products);
