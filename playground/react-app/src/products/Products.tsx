import React from 'react';
import { entityService, mediaService } from '@refract-cms/core';
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
import { Link } from 'react-router-dom';

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

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button component={(props: any) => <Link {...props} to="/admin" />}>Open admin panel</Button>
        <Typography variant="headline" gutterBottom>
          Products
        </Typography>
        {this.state.products.map(product => {
          const crop = product.image.crops && product.image.crops.main ? product.image.crops.main.pixelCrop : undefined;
          return (
            <Card className={classes.card} key={product._id}>
              {product.image && (
                <CardMedia className={classes.media} image={mediaService.buildUrl(product.image._id, crop)} />
              )}
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
