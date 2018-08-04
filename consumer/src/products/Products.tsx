import React from 'react';
import firebase from 'firebase';
import { Product } from './product.model';

interface State {
  productDocs: firebase.firestore.DocumentSnapshot[];
  loading: boolean;
}

class Products extends React.Component<{}, State> {
  unsubscribe?: () => void;

  state: State = {
    productDocs: [],
    loading: true
  }

  render() {
    return (
      <div>
        {this.state.productDocs.map(productDoc => {
          const product = productDoc.data() as Product;
          console.log(product);
          return (
            <div key={productDoc.id} >id: {productDoc.id} - type: {product.productType}</div>
          )
        })}
      </div>
    )
  }

  componentDidMount() {
    this.unsubscribe = firebase
      .firestore()
      .collection('product')
      .onSnapshot(snapshot => {
        this.setState({
          productDocs: snapshot.docs
        });
        this.setState({
          loading: false
        });
      });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}

export default Products;