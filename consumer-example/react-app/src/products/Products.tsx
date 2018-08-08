import React from 'react';
import { firebase } from '@firestore-cms/core';
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
  productDocuments: firebase.firestore.DocumentSnapshot[];
  loading: boolean;
  imageUrls: any;
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
  unsubscribe?: () => void;

  state: State = {
    productDocuments: [],
    loading: true,
    imageUrls: {}
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
        {this.state.productDocuments.map(productDocument => {
          const product = productDocument.data() as Product;
          const imageRef = product.images && product.images.length > 0 ? product.images[0] : undefined;
          return (
            <Card className={classes.card} key={productDocument.id}>
              {imageRef && this.renderImage(imageRef)}
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
    this.unsubscribe = firebase
      .firestore()
      .collection('product')
      .onSnapshot(snapshot => {
        this.setState({
          productDocuments: snapshot.docs
        });
        this.setState({
          loading: false
        });
        snapshot.docs.map(productDocument => {
          const product = productDocument.data() as Product;
          const imageRef = product.images && product.images.length > 0 ? product.images[0] : undefined;
          if (imageRef) {
            imageRef.get().then(imageSnapshot => {
              this.setState({
                imageUrls: {
                  ...this.state.imageUrls,
                  [productDocument.id]: imageSnapshot.data()!.url
                }
              });
            });
          }
        });
      });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}

export default withStyles(styles)(Products);
