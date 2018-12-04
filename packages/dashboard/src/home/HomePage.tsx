import React from 'react';
import { RouteComponentProps } from '@reach/router';
import Page from '../pages/Page';

interface HomePageProps extends RouteComponentProps {}

class HomePage extends React.Component<HomePageProps> {
  state = {
    c: 0
  };

  componentDidMount() {
    console.log('mounting homePage');
  }

  render() {
    return (
      <Page title="Home">
        <a onClick={() => this.setState({ c: this.state.c + 1 })}>homePage {this.state.c}</a>
      </Page>
    );
  }
}

export default HomePage;
