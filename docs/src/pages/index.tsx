import React from 'react';
import GatsbyLink, { navigate } from 'gatsby-link';
import Layout from '../layouts/layout';
import { graphql } from 'gatsby';
import {
  Link,
  Button,
  Typography,
  Divider,
  ListItem,
  ListItemText,
  List,
  Avatar,
  ListItemAvatar
} from '@material-ui/core';
import Img from 'gatsby-image';

// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema
interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
    [key: string]: any;
  };
}

export default class extends React.Component<IndexPageProps, {}> {
  constructor(props: IndexPageProps, context: any) {
    super(props, context);
  }
  public render() {
    return (
      <Layout title=" Welcome to the Refract Cms docs">
        <Typography variant="h5" gutterBottom>
          What is Refract-CMS?
        </Typography>
        <Typography paragraph>
          Refract-CMS is an open source, code first, self-hosted headless CMS using React, Express & MongoDB.
        </Typography>
        <Typography variant="h5" gutterBottom>
          How is it different from other CMS's?
        </Typography>
        <Typography paragraph>
          Unlike most other CMS systems, the schema is defined in JavaScript/TypeScript, and we do not force developers
          to use elaborate GUI's. Developers can live entirely in their chosen code editor, while content editors can
          utilize a blazing fast React based single-page-app, to manage content. This approach has some advantages: - It
          allows teams to properly code-review schema changes using their current git workflows. - Your schema's can be
          copy/pasted between projects, or distributed using your organizations private NPM registry etc. - Your schema
          can be deployed to multiple environments without requiring you to do duplicate work in a GUI or database
          imports, You just deploy the code and start editing. - Clean database, Refract-CMS only creates one mongo
          collection per schema, as it doesn't have to store schema information in there.
        </Typography>
        <Typography variant="h5" gutterBottom>
          GraphQL
        </Typography>
        <Typography paragraph>
          The CMS exposes a GraphQL endpoint, with rich filtering that you can use to query data for your frontend apps.
        </Typography>
        <Typography variant="h5" gutterBottom>
          Customization
        </Typography>
        <Typography paragraph>
          Property editors for each property on the entity model are added to the schema in code, allowing you to choose
          between some of the in-built editors (TextBox, Select, Image) or to write your own using React.
        </Typography>
        <Typography variant="h5" gutterBottom>
          Technologies
        </Typography>
        <List style={{ width: '100%' }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                component={(props: any) => <Img {...props} fixed={this.props.data.mongodbImg.childImageSharp.fixed} />}
              >
                M
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="MongoDB" secondary="This is used to persist the CMS data" />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                component={(props: any) => <Img {...props} fixed={this.props.data.nodejsImg.childImageSharp.fixed} />}
              >
                N
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="NodeJS" secondary="The runtime for the server code" />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                component={(props: any) => <Img {...props} fixed={this.props.data.tsImg.childImageSharp.fixed} />}
              >
                TS
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="TypeScript"
              secondary="This library works with TypeScript & JavaScript. TypeScript is recommended to allow it to verify your schema"
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                component={(props: any) => <Img {...props} fixed={this.props.data.reactImg.childImageSharp.fixed} />}
              >
                R
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="React"
              secondary="The dashboard is written in React, and custom editor components are provided as React components"
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>EX</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Express"
              secondary="Required to add the Refract Cms router which handles the GraphQL requests & authorization etc"
            />
          </ListItem>
        </List>
        <br />
        <Button variant="raised" component="a" color="secondary" onClick={() => navigate('/cli')}>
          Get started with CLI
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
    tsImg: file(relativePath: { eq: "ts.png" }) {
      childImageSharp {
        fixed(width: 40, height: 40) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    mongodbImg: file(relativePath: { eq: "mongodb.jpg" }) {
      childImageSharp {
        fixed(width: 40, height: 40) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    nodejsImg: file(relativePath: { eq: "nodejs.png" }) {
      childImageSharp {
        fixed(width: 40, height: 40) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    reactImg: file(relativePath: { eq: "react.png" }) {
      childImageSharp {
        fixed(width: 40, height: 40) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;
