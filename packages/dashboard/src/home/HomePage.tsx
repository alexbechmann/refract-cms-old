import React from 'react';
import { RouteComponentProps } from '@reach/router';
import Page from '../pages/Page';
import { Typography } from '@material-ui/core';

interface HomePageProps extends RouteComponentProps {}

class HomePage extends React.Component<HomePageProps> {
  render() {
    return (
      <Page title="Home">
        <Typography>Welcome to Refract-CMS</Typography>
      </Page>
    );
  }
}

export default HomePage;
