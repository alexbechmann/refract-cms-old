import * as React from 'react';
import GatsbyLink, { navigate } from 'gatsby-link';
import Layout from '../layouts/layout';
import { Link, Button, Typography, Divider } from '@material-ui/core';

// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema
interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
  };
}

export default class extends React.Component<IndexPageProps, {}> {
  constructor(props: IndexPageProps, context: any) {
    super(props, context);
  }
  public render() {
    return (
      <Layout title=" Welcome to the Refract Cms docs">
        <Typography gutterBottom>
          Welcome to the Refract Cms docs, a code first NodeJS/React based content management system.
        </Typography>
        <br />
        <Typography gutterBottom>
          Unlike most other CMS systems, the schema is defined in code, and not with a GUI. The schema config is passed
          into a react dashboard that we provide on the client, & the same config is specified on the server, creating a
          GraphQL endpoint. You can host a seperate React app for the CMS frontend, or add it to a route on your
          existing React app. Property editors for each property on the entity model are added to the schema here,
          allowing you to choose between some of the in-built editors (TextBox, Select, Image) or to write your own.
        </Typography>
        <br />
        <Typography gutterBottom>
          Writing custom components is a core feature, and is done by writing a React component.
        </Typography>
        <Button component="a" color="secondary" onClick={() => navigate('/existing-project')}>
          Add to an existing project
        </Button>
        <Button disabled component="a" color="secondary" onClick={() => navigate('/cli-start')}>
          Install using CLI (Coming soon...)
        </Button>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
