import * as React from 'react';
import GatsbyLink, { navigate } from 'gatsby-link';
import Layout from '../layouts/layout';
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
    console.log(this.props.data);
    return (
      <Layout title=" Welcome to the Refract Cms docs">
        <Typography>
          Welcome to the Refract Cms docs, a code first NodeJS/React based content management system.
        </Typography>
        <br />
        <Typography>
          Unlike most other CMS systems, the schema is defined in code, and not with a GUI. The schema config is
          referenced by both the client and server side code, allowing you to render the content editor dashboard &
          create the backend GraphQL endpoints from a strongly typed schema using typescript.
        </Typography>
        <br />
        <Typography>
          You can choose host a seperate react app for the CMS frontend, or add it to a route on your existing React app
          (e.g. with react-router).
        </Typography>
        <br />
        <Typography>
          Property editors for each property on the entity model are added to the schema here, allowing you to choose
          between some of the in-built editors (TextBox, Select, Image) or to write your own.
        </Typography>
        <br />
        <Typography>Writing custom components is a core feature, and is done by writing a React component.</Typography>
        <br />
        <br />
        <Typography variant="h5">Technologies</Typography>
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
        <br />
        <Button component="a" color="secondary" onClick={() => navigate('/starter-project')}>
          Starter project (Recommended)
        </Button>
        <Button component="a" onClick={() => navigate('/existing-project')}>
          Add to an existing project
        </Button>
        <br />
        <br />
        <Img fluid={this.props.data.adminDashboardImg.childImageSharp.fluid} />
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
    adminDashboardImg: file(relativePath: { eq: "admin-dashboard.png" }) {
      childImageSharp {
        fluid(maxWidth: 980) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
